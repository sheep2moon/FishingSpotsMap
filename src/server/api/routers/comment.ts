import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  commentDiscussion: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        discussionId: z.string(),
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
      if (input.attachmentData) {
        await ctx.prisma.comment.create({
          data: {
            content: input.content,
            authorId: ctx.session.user.id,
            discussionId: input.discussionId,
            parentId: input.parendId,
            replyToId: input.replyToId,
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
            content: input.content,
            authorId: ctx.session.user.id,
            discussionId: input.discussionId,
            parentId: input.parendId,
            replyToId: input.replyToId,
          },
        });
      }
    }),
});
