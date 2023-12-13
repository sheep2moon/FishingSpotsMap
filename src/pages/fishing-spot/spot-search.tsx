import React, { useEffect, useRef, useState } from "react";
import { type RouterInputs, api } from "../../lib/utils/api";
import LoadingSpinner from "../../components/ui/loading-spinner";
import autoAnimate from "@formkit/auto-animate";
import { Button } from "~/components/ui/button";
import FishingSpotCard from "../../components/FishingSpotCard";
import SortingMenu, { type SortingOption } from "../../components/sorting-menu";

type FisherySortingOption = SortingOption & {
  key: RouterInputs["fishery"]["getFilteredFishingSpots"]["orderBy"];
};

const sortingOptions: FisherySortingOption[] = [
  {
    key: "latest",
    name: "Od najnowszych",
  },
  {
    key: "oldest",
    name: "Od najstarszych",
  },
];

const SpotSearchList = () => {
  const parent = useRef(null);
  const [orderBy, setOrderBy] = useState<FisherySortingOption>(
    sortingOptions.find(
      (option) => option.key === "latest"
    ) as FisherySortingOption
  );
  const { data, fetchNextPage, isFetchingNextPage } =
    api.fishery.getFilteredFishingSpots.useInfiniteQuery(
      { limit: 16, orderBy: orderBy.key },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="mx-auto mt-16 w-full max-w-[1300px]">
      <SortingMenu
        options={sortingOptions}
        activeOption={orderBy}
        setActiveOption={setOrderBy}
      />
      <div className="flex flex-wrap justify-center gap-1 p-2" ref={parent}>
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
          <Button className="" onClick={() => void fetchNextPage()}>
            Załaduj więcej
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpotSearchList;
