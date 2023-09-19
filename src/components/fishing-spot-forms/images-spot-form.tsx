import React from "react";
import ImageInput from "../common/ImageInput";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconCamera } from "@tabler/icons-react";
import { type FishingSpotData } from "../../../schemas/fishing-spot.schema";

type ImagesSpotFormProps = Pick<FishingSpotData, "images"> & {
  setImages: (images: string[]) => void;
};

const ImagesSpotForm = ({ images, setImages }: ImagesSpotFormProps) => {
  const [parent] = useAutoAnimate();
  const handleUpload = (imageId: string) => {
    setImages([imageId, ...images]);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <IconCamera />
          Zdjęcia
        </CardTitle>
      </CardHeader>
      <CardContent
        ref={parent}
        className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6"
      >
        <ImageInput bucketFolderName="spot-images" onUpload={handleUpload} />
        {images.map((imageId) => (
          <div key={imageId} className="relative ">
            <Image
              className="rounded-md object-cover"
              src={getSpotImageSrc(imageId)}
              fill
              alt="pogląd łowiska"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImagesSpotForm;
