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

const SelectFishingSpot = () => {
  const [selectedFishingSpot, setSelectedFishingSpot] = useState<
    undefined | FishingSpot
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const deboncedSearchQuery = useDebounce<string>(searchQuery, 600);
  const { data: searchResults, refetch } =
    api.fishery.searchFishingSpots.useQuery(
      {
        searchQuery: deboncedSearchQuery,
      },
      { enabled: false }
    );
  useEffect(() => {
    if (deboncedSearchQuery.length >= 3) void refetch();
  }, [deboncedSearchQuery, refetch]);

  const handleSelectValue = (fishingSpot: FishingSpot) => {
    setSelectedFishingSpot(fishingSpot);
    setOpen(false);
  };

  return (
    <div className="relative flex gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" className="w-fit" variant="outline">
            {selectedFishingSpot ? selectedFishingSpot.name : "Ustaw łowisko"}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start">
          <Command>
            <CommandInput
              onValueChange={setSearchQuery}
              value={searchQuery}
              placeholder="Wpisz nazwę łowiska"
            />
            <CommandList>
              <CommandEmpty>Brak wyników.</CommandEmpty>
              {searchResults && (
                <CommandGroup heading="Wyniki">
                  {searchResults.map((fishingSpot) => (
                    <CommandItem
                      onSelect={() => handleSelectValue(fishingSpot)}
                      className="flex px-2 py-1"
                      key={fishingSpot.id}
                    >
                      {fishingSpot.name}
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
