import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ReactionType } from "@prisma/client";

export const commentRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(
      z.object({
        discussionId: z.string().optional(),
        catchId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.comment.findMany({
        select: {
          id: true,
          content: true,
          createdAt: true,
          discussionId: true,
          catchId: true,
          attachment: true,
          parentId: true,
          childrens: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              discussionId: true,
              catchId: true,
              attachment: true,
              parentId: true,
              author: {
                select: {
                  image: true,
                  name: true,
                  id: true,
                },
              },
              replyTo: {
                select: {
                  id: true,
                  author: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              reactions: {
                select: {
                  authorId: true,
                  type: true,
                },
              },
            },
          },
          author: {
            select: {
              image: true,
              name: true,
              id: true,
            },
          },
          replyTo: {
            select: {
              id: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
          reactions: {
            select: {
              authorId: true,
              type: true,
            },
          },
        },
        where: {
          parentId: null,
          OR: [
            { discussionId: input.discussionId },
            { catchId: input.catchId },
          ],
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
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const commentToDelete = await ctx.prisma.comment.findFirst({
        where: { id: input.commentId },
        select: {
          authorId: true,
        },
      });
      if (commentToDelete?.authorId === ctx.session.user.id) {
        await ctx.prisma.comment.delete({ where: { id: input.commentId } });
      }
    }),
  reactToComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        reactionType: z.enum([
          ReactionType.LIKE,
          ReactionType.DISLIKE,
          ReactionType.HELPFUL,
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const userReaction = await ctx.prisma.reaction.findFirst({
        where: {
          commentId: input.commentId,
          authorId: userId,
        },
      });
      // NEW REACTION
      if (!userReaction) {
        await ctx.prisma.reaction.create({
          data: {
            type: input.reactionType,
            authorId: ctx.session.user.id,
            commentId: input.commentId,
          },
        });

        return;
      }
      // CANCEL REACTION
      if (userReaction.type === input.reactionType) {
        await ctx.prisma.reaction.delete({
          where: {
            id: userReaction.id,
          },
        });
        return;
      }
      // UPDATE REACTION TYPE
      await ctx.prisma.reaction.update({
        where: {
          id: userReaction.id,
        },
        data: {
          type: input.reactionType,
        },
      });
      return;
    }),
});
