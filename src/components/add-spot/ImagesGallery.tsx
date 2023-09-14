import React from "react";
import ImageInput from "../common/ImageInput";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import Image from "next/image";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ImagesGallery = () => {
  const { imagesId, setField } = useNewSpotStore((store) => store);
  const [parent] = useAutoAnimate();
  const handleUpload = (imageId: string) => {
    setField("imagesId", [imageId, ...imagesId]);
  };
  return (
    <div ref={parent} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <ImageInput bucketFolderName="spot-images" onUpload={handleUpload} />
      {imagesId.map((imageId) => (
        <div key={imageId} className="relative ">
          <Image
            className="rounded-sm object-cover"
            src={getSpotImageSrc(imageId)}
            fill
            alt="pogląd łowiska"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesGallery;
