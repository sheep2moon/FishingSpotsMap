import { type S3 } from "aws-sdk";

type uploadFileArgs = {
  file: File;
  url: string;
  fields: S3.PresignedPost.Fields;
};

export const uploadFile = async ({ file, url, fields }: uploadFileArgs) => {
  const data = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return res;
  console.log(res);
};
