import React, { useEffect, useRef } from "react";
import { type RouterInputs, api } from "../../lib/utils/api";
import autoAnimate from "@formkit/auto-animate";
import { type SortingOption } from "../sorting-menu";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";
import FishingSpotCard from "../FishingSpotCard";

export type FisherySortingOption = SortingOption & {
  key: RouterInputs["fishery"]["getFilteredFishingSpots"]["orderBy"];
};

type SpotsGridProps = {
  orderBy: FisherySortingOption;
  searchQuery: string;
};

const SpotsGrid = (props: SpotsGridProps) => {
  const parent = useRef(null);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.fishery.getFilteredFishingSpots.useInfiniteQuery(
      { limit: 16, orderBy: props.orderBy.key, query: props.searchQuery },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  if (data?.pages[0]?.spots.length === 0)
    return (
      <div className="mt-8 flex justify-center py-4 text-lg">
        <h3>Brak wyników 🙁</h3>
      </div>
    );

  return (
    <>
      <div
        className="grid grid-cols-1 gap-x-4 p-2  lg:grid-cols-2"
        ref={parent}
      >
        {data?.pages.map((page) => (
          <>
            {page.spots.map((spot) => (
              <FishingSpotCard fishingSpot={spot} key={spot.id} />
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
          hasNextPage && (
            <Button className="" onClick={() => void fetchNextPage()}>
              Załaduj więcej
            </Button>
          )
        )}
      </div>
    </>
  );
};

export default SpotsGrid;
