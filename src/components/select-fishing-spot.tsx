import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import useDebounce from "../hooks/useDebounce";
import { api } from "../lib/utils/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { FishingSpot } from "@prisma/client";

type SelectFishingSpotProps = {
  onSpotSelect: (fishingSpot: FishingSpot) => void;
};

const SelectFishingSpot = ({ onSpotSelect }: SelectFishingSpotProps) => {
  const [selectedFishingSpot, setSelectedFishingSpot] = useState<
    undefined | FishingSpot
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce<string>(searchQuery, 600);

  const { data: searchResults, refetch } =
    api.fishery.searchFishingSpots.useQuery(
      {
        searchQuery: debouncedQuery,
      },
      { enabled: false }
    );

  useEffect(() => {
    if (debouncedQuery.length >= 3) void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleSelectValue = (fishingSpot: FishingSpot) => {
    setSelectedFishingSpot(fishingSpot);
    onSpotSelect(fishingSpot);
    setOpen(false);
  };

  return (
    <div className="relative flex gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" className="w-fit" variant="outline">
            {selectedFishingSpot
              ? `${selectedFishingSpot.name} - ${selectedFishingSpot.city}`
              : "Wyszukaj łowisko"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-screen sm:max-w-md xl:max-w-lg"
        >
          <Command>
            <CommandInput
              onValueChange={setSearchQuery}
              value={searchQuery}
              placeholder="Wpisz nazwę łowiska"
            />
            <CommandList>
              <CommandEmpty>Brak wyników.</CommandEmpty>
              {searchResults && (
                <CommandGroup>
                  {searchResults.map((fishingSpot) => (
                    <CommandItem
                      onSelect={() => handleSelectValue(fishingSpot)}
                      className="flex w-full p-2 text-base"
                      key={fishingSpot.id}
                    >
                      {`${fishingSpot.name} - ${fishingSpot.city}`}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectFishingSpot;
