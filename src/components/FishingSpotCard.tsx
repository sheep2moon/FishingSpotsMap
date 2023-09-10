import { FishingSpot } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getSpotImageSrc } from "../utils/getImageSrc";
import Link from "next/link";
import { IconMapPinFilled } from "@tabler/icons-react";

type FishingSpotCardProps = {
  fishingSpot: FishingSpot;
  slide?: boolean;
};

const FishingSpotCard = ({ fishingSpot, slide }: FishingSpotCardProps) => {
  return (
    <Link
      href={`/fishing-spot/${fishingSpot.id}`}
      className="hover:shadow-dark/20 text-secondary-foreground m-2 flex cursor-pointer flex-col justify-start rounded-md pb-2 shadow-md shadow-primary-700 ring-1 ring-primary/30 transition-all hover:ring-2 hover:transition-all dark:bg-primary-dark dark:text-primary-300"
    >
      <div className="relative aspect-video h-36 w-full">
        <Image
          className="rounded-md"
          src={getSpotImageSrc(fishingSpot.imagesId[0] || "")}
          alt="podgląd łowiska"
          fill
        />
      </div>

      <div className="px-2">
        <h4 className="overflow-ellipsis whitespace-nowrap text-base font-bold">
          {fishingSpot.name || "brak nazwy"}
        </h4>
        <div className="flex items-center gap-2">
          <IconMapPinFilled />
          <p className="whitespace-nowrap text-sm dark:text-primary-500">{`${fishingSpot.city}, ${fishingSpot.province}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default FishingSpotCard;
