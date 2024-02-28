import { IconChevronsRight, IconClock } from "@tabler/icons-react";
import React from "react";
import { api } from "../../lib/utils/api";
import Link from "next/link";
import FishingSpotCard from "../FishingSpotCard";
import RecentFisheriesSkeleton from "../skeletons/recent-fisheries-skeleton";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import { Navigation, Pagination } from "swiper/modules";

const RecentFisheries = () => {
  const recentFishingSpotsQuery = api.fishery.getRecentFishingSpots.useQuery({
    count: 4,
  });
  return (
    <div className="mt-8 w-full px-1 dark:text-primary-dark">
      <div className="flex w-full items-center justify-between p-2">
        <h2 className="flex gap-2 text-base font-semibold dark:text-primary sm:text-xl">
          <IconClock className="text-secondary" />
          Ostatnio dodane łowiska
        </h2>
        <Link
          href="/fishing-spot/list"
          className="flex items-center gap-1 text-primary-700 underline dark:text-primary"
        >
          przeglądaj łowiska <IconChevronsRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentFishingSpotsQuery.data ? (
          recentFishingSpotsQuery.data.map((fishingSpot) => (
            <FishingSpotCard
              key={`recent-${fishingSpot.id}`}
              fishingSpot={fishingSpot}
            />
          ))
        ) : (
          <RecentFisheriesSkeleton />
        )}
      </div>
    </div>
  );
};

export default RecentFisheries;
