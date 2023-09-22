import { S3 } from "aws-sdk";
import { env } from "../env.mjs";
import { v4 as uuidv4 } from "uuid";
import { type PresignedPost } from "aws-sdk/clients/s3";

type Fields = Record<string, string>;

export const uploadFile = async ({
  url,
  fields,
  file,
}: {
  url: string;
  fields: Record<string, string>;
  file: File;
}) => {
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key] as string);
  });
  formData.append("Content-Type", file.type);
  formData.append("file", file);

  await fetch(url, {
    method: "POST",
    body: formData,
  });
};
