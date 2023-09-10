import type { FishingSpot } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import { api } from "../../utils/api";
import Button from "../../components/common/Button";
import Link from "next/link";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const SpotSearchList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.fishery.getFilteredFishingSpots.useInfiniteQuery(
      { limit: 16, orderBy: "desc", orderByParam: "createdAt" },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );
  return (
    <div className="mt-16 w-full max-w-[1300px]">
      <div className="flex flex-wrap justify-center gap-1">
        {data?.pages.map((page, pageIndex) => (
          <>
            {page.spots.map((spot) => (
              <Link
                href={`/fishing-spot/${spot.id}`}
                className="hover:shadow-dark/60 w-full max-w-md rounded-md p-2 hover:shadow-sm sm:max-w-xs"
                key={spot.id}
              >
                <div className="bg-dark/5 w-full rounded-md transition-all hover:bg-white ">
                  <div className="relative aspect-video w-full ">
                    <Image
                      alt="widok"
                      className="rounded-md object-cover"
                      fill
                      src={getSpotImageSrc(spot.imagesId[0] || "")}
                      sizes="(max-width: 640px) 448px, 320px"
                    />
                  </div>
                  <div className="flex flex-col px-1 py-2">
                    <span className="truncate">{spot.name}</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {spot.city}, {spot.province}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ))}
      </div>
      <div className="mx-auto my-8 flex justify-center">
        {isFetchingNextPage ? (
          <div className="relative aspect-square w-16">
            <LoadingSpinner />
          </div>
        ) : (
          <Button className="" onClick={() => void fetchNextPage()}>
            Załaduj więcej
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpotSearchList;
