import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { fishTypes } from "../../../const/fish-types";

export const fisheryRouter = createTRPCRouter({
  getFishingSpot: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const fishingSpot = await ctx.prisma.fishingSpot.findFirst({
        where: { id: input.id },
        include: {
          reviews: true,
        },
      });
      const fish_types = fishingSpot?.fish_types
        ? (JSON.parse(fishingSpot.fish_types) as string[])
        : [];
      const imagesId = fishingSpot?.imagesId
        ? (JSON.parse(fishingSpot.imagesId) as string[])
        : [];
      return {
        ...fishingSpot,
        imagesId,
        fish_types,
      };
    }),
  // getFishingSpotReviews: publicProcedure.input(z.object({spotId: z.string()})).query(async ({input,ctx}) => {
  //   const reviewsData = ctx.prisma.r
  // }),
  getFisheries: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.fishingSpot.findMany({
      select: {
        id: true,
        lat: true,
        lng: true,
        name: true,
      },
    });
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
  addReview: protectedProcedure
    .input(
      z.object({
        rate: z.number(),
        comment: z.string(),
        spotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.review.create({
        data: {
          comment: input.comment,
          rate: input.rate,
          fishingSpotId: input.spotId,
          createdBy: ctx.session.user.id,
        },
      });
    }),
});
