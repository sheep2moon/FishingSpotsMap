import { type Image } from "@prisma/client";
import { mutationCatchSchema } from "../../../../schemas/catch.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const catchRouter = createTRPCRouter({
  getCatches: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.catch.findMany({
      include: {
        images: true,
        fishingSpot: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  getCatch: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.catch.findFirst({
        where: {
          id: input.id,
        },
        include: {
          images: true,
          fishingSpot: true,
          comments: true,
          user: true,
        },
      });
    }),
  newCatch: protectedProcedure
    .input(mutationCatchSchema)
    .mutation(async ({ input, ctx }) => {
      const newCatch = await ctx.prisma.catch.create({
        data: {
          fish_type: input.fishType,
          weight: input.weight,
          length: input.length,
          date: input.date,
          fishingSpotId: input.fishingSpotId,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
      const imagesData: Partial<Image>[] = input.images.map((imageId) => ({
        id: imageId,
        catchId: newCatch.id,
        userId: ctx.session?.user.id || "",
      }));
      await ctx.prisma.image.createMany({ data: imagesData });
    }),
});
