import type { FishingSpot } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import { api } from "../../lib/utils/api";
import Button from "../../components/common/Button";
import Link from "next/link";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import autoAnimate from "@formkit/auto-animate";

const SpotSearchList = () => {
  const parent = useRef(null);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.fishery.getFilteredFishingSpots.useInfiniteQuery(
      { limit: 16, orderBy: "desc", orderByParam: "createdAt" },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="mx-auto mt-16 w-full max-w-[1300px]">
      <div className="flex flex-wrap justify-center gap-1" ref={parent}>
        {data?.pages.map((page, pageIndex) => (
          <>
            {page.spots.map((spot) => (
              <Link
                href={`/fishing-spot/${spot.id}`}
                className="hover:shadow-dark/60 w-full max-w-md rounded-md p-2 hover:shadow-sm sm:max-w-xs"
                key={spot.id}
              >
                <div className="ring-primary-950/40 hover:bg-primary-dark dark:bg-primary-950/20 w-full  rounded-md ring transition-all hover:ring-2 ">
                  <div className="relative aspect-video w-full ">
                    <Image
                      alt="widok"
                      className="rounded-md object-cover"
                      fill
                      src={getSpotImageSrc(spot.images[0]?.id)}
                      sizes="(max-width: 640px) 448px, 320px"
                    />
                  </div>
                  <div className="flex flex-col px-1 py-2">
                    <span className="truncate">{spot.name || "bez nazwy"}</span>
                    <span className="text-primary-300 text-xs font-semibold">
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
