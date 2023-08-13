import {
  IconBoxPadding,
  IconChevronsRight,
  IconClock,
  IconMapPinFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import React from "react";
import { api } from "../../utils/api";
import Link from "next/link";
import Image from "next/image";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import { IconFishHook } from "@tabler/icons-react";

const RecentFisheries = () => {
  const recentFishingSpotsQuery = api.fishery.getRecentFishingSpots.useQuery();
  return (
    <div className="mt-8 w-full max-w-screen-xl px-2">
      <div className="flex items-center justify-between p-2">
        <h2 className="flex gap-2 text-xl font-semibold ">
          <IconClock className="text-accent" />
          Ostatnio dodane łowiska
        </h2>
        <Link href="/" className="flex items-center gap-1">
          zobacz więcej <IconChevronsRight />
        </Link>
      </div>
      <div className="">
        <div className="grid grid-cols-4 gap-2">
          {recentFishingSpotsQuery.data &&
            recentFishingSpotsQuery.data.map((spot) => (
              <Link
                href={`/fishing-spot/${spot.id}`}
                key={`recent-${spot.id}`}
                className="flex cursor-pointer flex-col justify-start rounded-md bg-light pb-2 text-dark transition-all hover:scale-[101%] hover:shadow-md hover:shadow-dark/20 hover:transition-all"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    className="rounded-md"
                    src={getSpotImageSrc(spot.imagesId[0] || "")}
                    alt="podgląd łowiska"
                    fill
                  />
                </div>

                <div className="px-2">
                  <h4 className="overflow-ellipsis whitespace-nowrap text-base font-bold">
                    {spot.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <IconMapPinFilled />
                    <p className="whitespace-nowrap text-sm text-dark/90">{`${spot.city}, ${spot.province}`}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentFisheries;
