/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      const prices = fishingSpot?.prices
        ? (JSON.parse(fishingSpot?.prices) as {
            title: string;
            value: string;
          }[])
        : [];
      return {
        ...fishingSpot,
        imagesId,
        fish_types,
        prices,
      };
    }),
  searchFishingSpots: publicProcedure
    .input(
      z.object({
        searchQuery: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.fishingSpot.findMany({
        where: {
          name: { contains: input.searchQuery },
        },
        take: 8,
      });
      return res;
    }),
  getFilteredFishingSpots: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        orderByParam: z.enum(["createdAt", "rating", "ratingCount"]),
        orderBy: z.enum(["asc", "desc"]),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 25;
      const spots = await ctx.prisma.fishingSpot.findMany({
        orderBy: { [input.orderByParam]: input.orderBy },
        take: limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          images: true,
        },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (spots.length > limit) {
        const lastSpot = spots.pop();
        nextCursor = lastSpot!.id;
      }
      return { spots, nextCursor };
    }),
  getRecentFishingSpots: publicProcedure
    .input(
      z.object({
        count: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const spots = await ctx.prisma.fishingSpot.findMany({
        orderBy: { createdAt: "desc" },
        take: input.count ? input.count : 4,
        include: {
          images: true,
        },
      });

      return spots;
    }),
  getFishingSpotsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fishingSpot.count();
  }),
  // getFishingSpotReviews: publicProcedure.input(z.object({spotId: z.string()})).query(async ({input,ctx}) => {
  //   const reviewsData = ctx.prisma.r
  // }),
  getFisheries: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.fishingSpot.findMany({
      select: {
        id: true,
        name: true,
        lat: true,
        lng: true,
      },
    });
    // const res = await ctx.prisma.fishingSpot.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     imagesId: true,
    //   },
    // });
    // for (const spot of res) {
    //   console.log(spot.name);
    //   const imagesId = spot?.imagesId
    //     ? (JSON.parse(spot.imagesId) as string[])
    //     : [];
    //   if (imagesId.length > 0) {
    //     await ctx.prisma.image.create({
    //       data: {
    //         fishingSpotId: spot.id,
    //         id: imagesId[0],
    //       },
    //     });
    //   }
    // }

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
