import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { fishTypes } from "../../../const/fish-types";

export const fisheryRouter = createTRPCRouter({
  addFishery: publicProcedure
    .input(
      z.object({
        name: z.string(),
        province: z.string(),
        city: z.string(),
        fish_types: z.array(z.enum(fishTypes)),
        area: z.string(),
        contact: z.string(),
        night_fishing: z.boolean(),
        tent: z.boolean(),
        accommodation: z.boolean(),
        spinning: z.boolean(),
        lat: z.number(),
        lng: z.number(),
        prices: z.string(),
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
          id: input.name.replace(" ", "-"),
          ...input,
          fish_types: input.fish_types.join(","),
          published,
          acceptedBy,
        },
      });
      return res;
    }),
});
