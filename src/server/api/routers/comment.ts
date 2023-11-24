import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Comment } from "@prisma/client";

export const commentRouter = createTRPCRouter({
  commentCatch: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        catchId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          catchId: input.catchId,
          authorId: ctx.session.user.id,
        },
      });
    }),
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        targetId: z.string(),
        targetType: z.enum(["DISCUSSION", "CATCH"]),
        parendId: z.string().optional(),
        replyToId: z.string().optional(),
        attachmentData: z
          .object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
            url: z.string(),
          })
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCommentData = {
        content: input.content,
        authorId: ctx.session.user.id,
        parentId: input.parendId,
        replyToId: input.replyToId,
      };
      if (input.targetType === "DISCUSSION")
        Object.assign(newCommentData, { discussionId: input.targetId });
      if (input.targetType === "CATCH")
        Object.assign(newCommentData, { catchId: input.targetId });

      if (input.attachmentData) {
        await ctx.prisma.comment.create({
          data: {
            ...newCommentData,
            attachment: {
              create: {
                ...input.attachmentData,
              },
            },
          },
        });
      } else {
        await ctx.prisma.comment.create({
          data: {
            ...newCommentData,
          },
        });
      }
    }),
});
