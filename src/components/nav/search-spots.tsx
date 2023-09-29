import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { api } from "../../lib/utils/api";
import { type FishingSpot } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import LoadingSpinner from "../ui/loading-spinner";
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
import { InternalLink } from "../ui/internal-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SearchSpots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const deboncedSearchQuery = useDebounce<string>(searchQuery, 600);
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="px-2"
                onClick={() => setIsOpen(true)}
                variant="ghost"
              >
                <IconSearch />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Wyszukaj łowiska</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="inset-0 top-0 z-[1001] w-screen max-w-none translate-x-0 translate-y-0 sm:bottom-auto sm:left-1/2 sm:top-16 sm:max-w-lg sm:-translate-x-1/2">
        <DialogHeader>
          <DialogTitle>Wyszukaj łowiska po nazwie</DialogTitle>
          <DialogDescription>
            Możesz również wyszukać łowisk na
            <InternalLink
              className="px-2 text-info dark:text-info"
              variant="link"
              href="/fishing-spots-map"
            >
              mapie
            </InternalLink>
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Input
            type="search"
            placeholder="Wpisz nazwę łowiska"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <div>
            <SearchResultsContainer
              close={() => setIsOpen(false)}
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
  close: () => void;
};

const SearchResultsContainer = ({
  isLoading,
  searchResults,
  searchQuery,
  close,
}: SearchResultsContainerProps) => {
  if (searchQuery.length === 0) return <></>;
  if (searchQuery.length < 3)
    return <div className="mt-4 text-center">Wprowadź minimum 3 znaki</div>;
  if (isLoading || typeof searchResults === "undefined")
    return (
      <div className="relative m-auto h-20 w-20">
        <LoadingSpinner />
      </div>
    );
  if (searchResults.length === 0)
    return <div className="mt-4 text-center">Brak wyników wyszukiwania</div>;

  return (
    <div className="mt-2 flex flex-col gap-1">
      {searchResults.map((fishingSpot) => (
        <InternalLink
          onClick={close}
          variant="link"
          href={`/fishing-spot/${fishingSpot.id}`}
          className="justify-start"
          key={fishingSpot.id}
        >
          {fishingSpot.name}
        </InternalLink>
      ))}
    </div>
  );
};

export default SearchSpots;
