import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tagSchema } from "../../../../schemas/tag.schema";

export const discussionRouter = createTRPCRouter({
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
});
