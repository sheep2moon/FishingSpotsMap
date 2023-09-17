import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { api } from "../../lib/utils/api";
import { useRouter } from "next/router";
import { FishingSpot } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SearchSpots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const deboncedSearchQuery = useDebounce<string>(searchQuery, 600);
  const router = useRouter();
  const {
    data: searchResults,
    isLoading,
    refetch,
  } = api.fishery.searchFishingSpots.useQuery(
    {
      searchQuery: deboncedSearchQuery,
    },
    { enabled: false }
  );
  useEffect(() => {
    if (deboncedSearchQuery.length >= 3) void refetch();
  }, [deboncedSearchQuery, refetch]);

  //   const handleSelectSearchSpot = (spot: FishingSpot) => {
  //     console.log("spot");
  //     void router.push(`/fishing-spot/${spot.id}`);
  //   };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <IconSearch />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wyszukaj łowiska</DialogTitle>
          <Button>Przeglądaj mape łowisk</Button>
        </DialogHeader>
        <div>
          <Input
            type="search"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <div>
            <SearchResultsContainer
              isLoading={isLoading}
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type SearchResultsContainerProps = {
  isLoading: boolean;
  searchResults: FishingSpot[] | undefined;
  searchQuery: string;
};

const SearchResultsContainer = ({
  isLoading,
  searchResults,
  searchQuery,
}: SearchResultsContainerProps) => {
  if (searchQuery.length === 0) return <></>;
  if (isLoading || typeof searchResults === "undefined")
    return (
      <div className="relative m-auto h-20 w-20">
        <LoadingSpinner />
      </div>
    );
  if (searchResults.length === 0) return <span>Brak wyników wyszukiwania</span>;

  return (
    <div className="mt-2 flex flex-col gap-1">
      {searchResults.map((fishingSpot) => (
        <div className="p-2" key={fishingSpot.id}>
          {fishingSpot.name}
        </div>
      ))}
    </div>
  );
};

export default SearchSpots;
