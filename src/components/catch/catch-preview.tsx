import type { Catch, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getCatchImageSrc } from "../../lib/utils/getImageSrc";
import { RouterOutputs } from "../../lib/utils/api";

type CatchPreviewProps = {
  fishCatch: RouterOutputs["catch"]["getCatches"][number];
};

const CatchPreview = ({ fishCatch }: CatchPreviewProps) => {
  return (
    <div className="rounded-sm p-2 dark:bg-primary-dark">
      <div className="relative aspect-square w-32">
        <Image fill src={getCatchImageSrc(fishCatch.images[0]?.id)} alt="" />
      </div>
      <div className="flex flex-col py-1">
        <span>{fishCatch.fish_type}</span>
        <span>{fishCatch.weight}g</span>
        <span>{fishCatch.length}cm</span>
        <span>{fishCatch.fishingSpot?.name}</span>
      </div>
    </div>
  );
};

export default CatchPreview;
