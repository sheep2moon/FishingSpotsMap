import { S3Client } from "@aws-sdk/client-s3";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type PresignedPost } from "aws-sdk/clients/s3";
import { env } from "../../../env.mjs";
import { z } from "zod";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { TRPCError } from "@trpc/server";

export const s3 = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

export const imagesRouter = createTRPCRouter({
  createPresignedUrl: publicProcedure
    .input(z.object({ id: z.string(), folderName: z.string() }))
    .mutation(async ({ input }) => {
      // const s3Data: PresignedPost = await new Promise((resolve, reject) => {

      // });
      try {
        const { url, fields } = await createPresignedPost(s3, {
          Key: `${input.folderName}/${input.id}`,
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, 5000000],
          ],
          Expires: 60,
          Bucket: env.S3_BUCKET_NAME,
        });
        return { url, fields };
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error creating PresignedS3Url",
        });
      }
    }),
});
