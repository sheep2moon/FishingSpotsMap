import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notificationsRouter = createTRPCRouter({
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notification.findMany({
      where: { notifiedId: ctx.session.user.id },
    });
  }),
  readNotification: protectedProcedure
    .input(
      z.object({
        notificationId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.notification.update({
        where: { id: input.notificationId },
        data: {
          read: true,
        },
      });
    }),
  deleteNotification: protectedProcedure
    .input(
      z.object({
        notificationId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.notification.delete({
        where: { id: input.notificationId },
      });
    }),
});
