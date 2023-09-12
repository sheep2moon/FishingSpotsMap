export const getSpotImageSrc = (id: string | null | undefined) => {
  if (typeof id === "string") {
    return `https://fishery-spots.s3.eu-central-1.amazonaws.com/spot-images/${id}`;
  }
  return "";
};
