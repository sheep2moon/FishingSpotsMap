import {
  IconBoxPadding,
  IconChevronsRight,
  IconClock,
  IconMapPinFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import React from "react";
import { api } from "../../lib/utils/api";
import Link from "next/link";
import Image from "next/image";
import FishingSpotCard from "../FishingSpotCard";
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
    <div className="dark:text-primary-dark mt-8 w-full max-w-screen-xl px-2">
      <div className="flex items-center justify-between p-2">
        <h2 className="dark:text-primary flex gap-2 text-xl font-semibold ">
          <IconClock className="text-secondary" />
          Ostatnio dodane łowiska
        </h2>
        <Link href="/" className="flex items-center gap-1">
          zobacz więcej <IconChevronsRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recentFishingSpotsQuery.data &&
          recentFishingSpotsQuery.data.map((fishingSpot) => (
            <FishingSpotCard
              key={`recent-${fishingSpot.id}`}
              fishingSpot={fishingSpot}
            />
          ))}
      </div>
    </div>
  );
};

export default RecentFisheries;
