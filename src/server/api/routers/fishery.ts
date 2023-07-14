import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fishTypes } from "../../../const/fish-types";

export const fisheryRouter = createTRPCRouter({
  getFishingSpot: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const fishingSpot = await ctx.prisma.fishingSpot.findFirst({
        where: { id: input.id },
      });
      return fishingSpot;
    }),
  getFisheries: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.fishingSpot.findMany();
    return res;
  }),
  addFishery: publicProcedure
    .input(
      z.object({
        name: z.string(),
        province: z.string(),
        city: z.string(),
        area: z.string(),
        contact: z.string(),
        night_fishing: z.boolean(),
        tent: z.boolean(),
        accommodation: z.boolean(),
        spinning: z.boolean(),
        lat: z.number(),
        lng: z.number(),
        fish_types: z.array(z.enum(fishTypes)),
        prices: z.array(z.object({ title: z.string(), value: z.string() })),
        imagesId: z.array(z.string()),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let published = false;
      let acceptedBy = "";
      if (ctx.session?.user.role === "MODERATOR") {
        published = true;
        acceptedBy = ctx.session.user.id;
      }
      const res = await ctx.prisma.fishingSpot.create({
        data: {
          id: encodeURIComponent(input.name.replace(" ", "-").toLowerCase()),
          ...input,
          prices: JSON.stringify(input.prices),
          imagesId: JSON.stringify(input.imagesId),
          fish_types: JSON.stringify(input.fish_types),
          published,
          acceptedBy,
        },
      });
      return res;
    }),
});
