import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ReportTargetType } from "@prisma/client";

export const reportRouter = createTRPCRouter({
  createReport: publicProcedure
    .input(
      z.object({
        content: z.string(),
        targetId: z.string().optional(),
        targetType: z.enum([
          ReportTargetType.GLOBAL,
          ReportTargetType.CATCH,
          ReportTargetType.COMMENT,
          ReportTargetType.DISCUSSION,
          ReportTargetType.FISHING_SPOT,
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.report.create({
        data: {
          content: input.content,
          target_id: input.targetId,
          target_type: input.targetType,
        },
      });
    }),
});
