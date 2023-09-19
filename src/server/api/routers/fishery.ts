/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { fishTypes } from "../../../const/fish-types";
import type { Image as SpotImage } from "@prisma/client";
import { FishTypes } from "../../../types/global";

export const fisheryRouter = createTRPCRouter({
  getFishingSpot: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const fishingSpot = await ctx.prisma.fishingSpot.findFirst({
        where: { id: input.id },
        include: {
          reviews: true,
          images: true,
        },
      });
      if (!fishingSpot) return null;
      const fish_types = fishingSpot?.fish_types
        ? (JSON.parse(fishingSpot.fish_types) as FishTypes)
        : [];
      const prices = fishingSpot?.prices
        ? (JSON.parse(fishingSpot?.prices) as {
            title: string;
            value: string;
          }[])
        : [];
      const rating =
        fishingSpot.reviews.reduce((prev, curr) => {
          return prev + curr.rate;
        }, 0) / fishingSpot.reviews.length || "-";
      return {
        ...fishingSpot,
        fish_types,
        prices,
        rating,
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
  getFisheries: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.fishingSpot.findMany({
      select: {
        id: true,
        name: true,
        lat: true,
        lng: true,
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
        images: z.array(z.string()),
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
      const newSpot = await ctx.prisma.fishingSpot.create({
        data: {
          name: input.name,
          province: input.province,
          city: input.city,
          area: input.area,
          contact: input.contact,
          night_fishing: input.night_fishing,
          tent: input.tent,
          accommodation: input.accommodation,
          spinning: input.spinning,
          lat: input.lat,
          lng: input.lng,
          description: input.description,
          fish_types: JSON.stringify(input.fish_types),
          prices: JSON.stringify(input.prices),
          published,
          acceptedBy,
        },
      });
      const imagesData: SpotImage[] = input.images.map((imageId) => ({
        fishingSpotId: newSpot.id,
        id: imageId,
        userId: ctx.session?.user.id || "",
        source: "",
        comment: "",
      }));
      await ctx.prisma.image.createMany({
        data: imagesData,
      });
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
