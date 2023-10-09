import { env } from "../../env.mjs";

const baseUrl = `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${env.NEXT_PUBLIC_S3_REGION}.amazonaws.com`;

export const getSpotImageSrc = (id: string | null | undefined) => {
  if (typeof id === "string") {
    return `${baseUrl}/spot-images/${id}`;
  }
  return "";
};

export const getAttachmentSrc = (id: string) => {
  return `${baseUrl}/discussion-attachments/${id}`;
};
