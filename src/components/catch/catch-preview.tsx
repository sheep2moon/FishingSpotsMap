import type { Catch, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getCatchImageSrc } from "../../lib/utils/getImageSrc";
import { RouterOutputs } from "../../lib/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TimeBadge from "../ui/time-badge";
import Link from "next/link";

type CatchPreviewProps = {
  fishCatch: RouterOutputs["catch"]["getCatches"][number];
};

const CatchPreview = ({ fishCatch }: CatchPreviewProps) => {
  return (
    <Link href={`/catch/${fishCatch.id}`}>
      <Card>
        <CardHeader className="p-1 px-2">
          <CardTitle className="m-0 flex flex-col items-start gap-0 text-base">
            <div className="mt-2 flex w-full justify-between">
              <span className="text-lg">{fishCatch.fishingSpot?.name}</span>
              {fishCatch.date && <TimeBadge date={fishCatch.date} />}
            </div>

            <span className="text-xs text-primary-400">
              Dodane przez:
              <span className="text-sky-300">{fishCatch.user.name}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="relative h-36 w-full">
            <Image
              className="object-cover"
              fill
              src={getCatchImageSrc(fishCatch.images[0]?.id)}
              alt=""
            />
          </div>
          <span>{fishCatch.fish_type}</span>
          <div className="flex justify-between">
            <span>
              {(fishCatch.weight / 1000).toFixed(2).replace(".", ",")} kg
            </span>
            <span>{fishCatch.length}cm</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CatchPreview;
