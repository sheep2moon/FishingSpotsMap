import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const moderatorRouter = createTRPCRouter({
  getEditableSpotFields: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const spot = await ctx.prisma.fishingSpot.findFirst({
        where: { id: input.id },
      });
    }),
  editStringField: protectedProcedure
    .input(
      z.object({
        fieldKey: z.enum([
          "imagesId",
          "prices",
          "name",
          "description",
          "province",
          "city",
          "fish_types",
          "area",
          "contact",
        ]),
        fieldValue: z.string(),
        spotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.fishingSpot.update({
        where: { id: input.spotId },
        data: {
          [input.fieldKey]: input.fieldValue,
        },
      });
    }),
  editBooleanField: protectedProcedure
    .input(
      z.object({
        fieldKey: z.enum([
          "night_fishing",
          "tent",
          "accommodation",
          "spinning",
        ]),
        fieldValue: z.boolean(),
        spotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.fishingSpot.update({
        where: { id: input.spotId },
        data: {
          [input.fieldKey]: input.fieldValue,
        },
      });
    }),
  editPosition: protectedProcedure
    .input(
      z.object({
        spotId: z.string(),
        lat: z.number(),
        lng: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.fishingSpot.update({
        where: { id: input.spotId },
        data: { lat: input.lat, lng: input.lng },
      });
    }),
});
