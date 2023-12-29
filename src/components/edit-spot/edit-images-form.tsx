import React from "react";
import { FSpotData } from "../../../schemas/fishing-spot.schema";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";

type EditImagesFormProps = Pick<FSpotData, "images">;

const EditImagesForm = (props: EditImagesFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 lg:grid-cols-4 lg:p-3">
      {props.images.map((image) => (
        <div className="relative aspect-square h-full w-full" key={image.id}>
          <Image
            className="aspect-square rounded-sm object-cover"
            alt="widok"
            fill
            src={getSpotImageSrc(image.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default EditImagesForm;
