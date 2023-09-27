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
