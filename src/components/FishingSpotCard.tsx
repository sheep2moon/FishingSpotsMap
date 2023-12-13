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
          "hover:shadow-dark/20 relative mb-4 flex h-60 cursor-pointer flex-col justify-start rounded-md ring-secondary transition-all hover:ring-2 hover:transition-all dark:bg-primary-dark dark:text-primary-300"
        )}
      >
        <Image
          className="rounded-md object-cover"
          src={getSpotImageSrc(fishingSpot.images[0]?.id)}
          alt="podgląd łowiska"
          fill
        />
        {/* <div className="relative aspect-video w-full"></div> */}

        <div className="absolute bottom-4 left-0 right-4 z-10 rounded-r-sm border-l-2 border-secondary bg-primary px-2 py-2 text-primary-dark dark:bg-primary-950 dark:text-primary">
          <h4 className="overflow-ellipsis whitespace-nowrap text-base font-bold">
            {fishingSpot.name || "brak nazwy"}
          </h4>
          <div className="flex items-center gap-1">
            <IconMapPinFilled className="w-4 text-primary-400 sm:w-6" />
            <p className="truncate text-sm dark:text-primary-300">{`${fishingSpot.city}, ${fishingSpot.province}`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FishingSpotCard;
