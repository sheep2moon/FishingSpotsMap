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
  getDiscussions: publicProcedure
    .input(
      z.object({
        tag: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.discussion.findMany({
        where: {
          tags: {
            some: {
              tag: {
                name: input.tag,
              },
            },
          },
        },
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
  getRecentDiscussions: publicProcedure
    .input(
      z.object({
        count: z.number().default(4),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.discussion.findMany({
        include: {
          tags: { include: { tag: { select: { name: true } } } },
          comments: { select: { _count: true } },
          author: { select: { name: true, image: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.count,
      });
    }),
});
