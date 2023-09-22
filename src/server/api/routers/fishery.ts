/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { Image, Image as SpotImage } from "@prisma/client";
import { type FishType } from "../../../types/global";
import { fishingSpotSchema } from "../../../../schemas/fishing-spot.schema";
import { uploadFile } from "../../image-handlers";

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
        ? (JSON.parse(fishingSpot.fish_types) as FishType[])
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
    .input(fishingSpotSchema)
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
          contact_email: input.contact_email,
          contact_instagram: input.contact_instagram,
          contact_page: input.contact_page,
          contact_phone: input.contact_phone,
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
      const imagesData: Image[] = input.images.map((image) => ({
        ...image,
        fishingSpotId: newSpot.id,
        userId: ctx.session?.user.id || "",
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
  addImageToSpot: protectedProcedure
    .input(
      z.object({
        spotId: z.string(),
        comment: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.image.create({
        data: {
          userId: ctx.session.user.id,
          comment: input.comment || "",
          source: input.source || "",
          fishingSpotId: input.spotId,
        },
      });
    }),
});
