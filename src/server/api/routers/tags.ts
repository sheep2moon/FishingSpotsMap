import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tagsRouter = createTRPCRouter({
  addTag: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.tag.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
  getTags: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tag.findMany();
  }),
});
