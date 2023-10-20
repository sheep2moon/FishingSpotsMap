import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { tagSchema } from "../../../../schemas/tag.schema";
import { TRPCClientError } from "@trpc/client";

export const discussionRouter = createTRPCRouter({
  getDiscussionById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const discussion = await ctx.prisma.discussion.findFirst({
        where: {
          id: input.id,
        },
        include: {
          attachments: true,
          author: true,
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              discussionId: true,
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
            },
            where: {
              parentId: null,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      if (!discussion) throw new TRPCClientError("No discussion found");
      return discussion;
    }),
  getDiscussions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.discussion.findMany({
      include: {
        tags: { include: { tag: { select: { name: true } } } },
        comments: { select: { _count: true } },
        author: { select: { name: true, image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  createDiscussion: protectedProcedure
    .input(
      z.object({
        title: z.string().min(20),
        content: z.string().min(50),
        tags: tagSchema.array().min(1),
        attachments: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
            url: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);

      await ctx.prisma.discussion.create({
        data: {
          authorId: ctx.session.user.id,
          title: input.title,
          content: input.content,
          attachments: {
            createMany: {
              data: input.attachments,
            },
          },
          tags: {
            create: input.tags.map((tag) => ({ tagId: tag.id })),
          },
        },
      });
    }),
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
          authorId: ctx.session.user.id,
        },
      });
    }),
  getCommentReplies: publicProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          parentId: input.commentId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          discussionId: true,
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