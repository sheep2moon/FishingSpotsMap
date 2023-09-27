import type { FishingSpot, Image as SpotImage } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getSpotImageSrc } from "../lib/utils/getImageSrc";
import Link from "next/link";
import { IconMapPinFilled } from "@tabler/icons-react";
import clsx from "clsx";

type FishingSpotCardProps = {
  fishingSpot: FishingSpot & { images: SpotImage[] };
  slide?: boolean;
};

const FishingSpotCard = ({ fishingSpot }: FishingSpotCardProps) => {
  return (
    <div className="w-full">
      <Link
        href={`/fishing-spot/${fishingSpot.id}`}
        className={clsx(
          "hover:shadow-dark/20 text-secondary-foreground mb-4 flex cursor-pointer flex-col justify-start rounded-md shadow-md shadow-primary-700 ring-1 ring-primary/30 transition-all hover:ring-2 hover:transition-all dark:bg-primary-dark dark:text-primary-300"
        )}
      >
        <div className="relative aspect-video w-full">
          <Image
            className="rounded-md"
            src={getSpotImageSrc(fishingSpot.images[0]?.id)}
            alt="podgląd łowiska"
            fill
          />
        </div>

        <div className="px-2 py-2">
          <h4 className="overflow-ellipsis whitespace-nowrap text-base font-bold">
            {fishingSpot.name || "brak nazwy"}
          </h4>
          <div className="flex items-center gap-1">
            <IconMapPinFilled className="w-4 sm:w-8" />
            <p className="truncate text-sm dark:text-primary-500">{`${fishingSpot.city}, ${fishingSpot.province}`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FishingSpotCard;
