import React from "react";
import ImageInput from "../common/ImageInput";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconCamera } from "@tabler/icons-react";

const ImagesGallery = () => {
  const { imagesId, setField } = useNewSpotStore((store) => store);
  const [parent] = useAutoAnimate();
  const handleUpload = (imageId: string) => {
    setField("imagesId", [imageId, ...imagesId]);
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
        {imagesId.map((imageId) => (
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

export default ImagesGallery;
