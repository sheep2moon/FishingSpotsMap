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
import Slider from "../common/Slider";
import FishingSpotCard from "../FishingSpotCard";

const RecentFisheries = () => {
  const recentFishingSpotsQuery = api.fishery.getRecentFishingSpots.useQuery();
  return (
    <div className="mt-8 w-full max-w-screen-xl px-2 dark:text-primary-dark">
      <div className="flex items-center justify-between p-2">
        <h2 className="flex gap-2 text-xl font-semibold dark:text-primary ">
          <IconClock className="text-secondary" />
          Ostatnio dodane łowiska
        </h2>
        <Link href="/" className="flex items-center gap-1">
          zobacz więcej <IconChevronsRight />
        </Link>
      </div>
      <Slider>
        {recentFishingSpotsQuery.data &&
          recentFishingSpotsQuery.data.map((fishingSpot) => (
            <FishingSpotCard
              fishingSpot={fishingSpot}
              key={`recent-${fishingSpot.id}`}
            />
          ))}
      </Slider>
    </div>
  );
};

export default RecentFisheries;
