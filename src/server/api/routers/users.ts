import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getPublicUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
        select: {
          id: true,
          image: true,
          name: true,
        },
      });
      return user;
    }),
  getPrivateUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  followFishingSpot: protectedProcedure
    .input(
      z.object({
        spotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          followedSpots: {
            connect: { id: input.spotId },
          },
        },
      });
    }),
  unfollowFishingSpot: protectedProcedure
    .input(
      z.object({
        spotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          followedSpots: {
            disconnect: { id: input.spotId },
          },
        },
      });
    }),
});
