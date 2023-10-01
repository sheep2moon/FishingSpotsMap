import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { UserAchievement } from "@prisma/client";

export const achievementsRouter = createTRPCRouter({
  getAchievements: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.achievement.findMany({});
  }),
  getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.userAchievement.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
