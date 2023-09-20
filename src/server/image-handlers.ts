import { S3 } from "aws-sdk";
import { env } from "../env.mjs";
import { v4 as uuidv4 } from "uuid";
import { type PresignedPost } from "aws-sdk/clients/s3";

export const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_KEY,
  region: env.S3_REGION,
  signatureVersion: "v4",
});

export const uploadImage = async (bucketFolderName: string) => {
  const imageId = uuidv4();
  const s3Data: PresignedPost = await new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Fields: {
          key: `${bucketFolderName}/${imageId}`,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, 5000000],
        ],
        Expires: 60,
        Bucket: env.S3_BUCKET_NAME,
      },
      (err, signed) => {
        if (err) return reject(err);
        resolve(signed);
      }
    );
  });
  return { url: s3Data.url, fields: s3Data.fields, imageId };
};
