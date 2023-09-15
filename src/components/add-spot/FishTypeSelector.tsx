import React from "react";
import { type FishType, fishTypes } from "../../const/fish-types";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import clsx from "clsx";

const FishTypeSelector = () => {
  const { fish_types, setField } = useNewSpotStore((store) => store);

  const handleFishClick = (fish: FishType) => {
    if (fish_types.includes(fish)) {
      const new_types = fish_types.filter((typeName) => typeName !== fish);
      setField("fish_types", new_types);
    } else {
      const new_types = [...fish_types, fish];
      setField("fish_types", new_types);
    }
  };
  return (
    <div className="mt-8">
      <h3 className="mb-2 text-xl">Wybierz gatunki występujących ryb</h3>
      <div className="flex max-w-lg flex-wrap gap-1">
        {fishTypes.map((fishName) => (
          <div
            onClick={() => handleFishClick(fishName)}
            className={clsx(
              "cursor-default rounded-sm p-2 ring-1 hover:ring-secondary",
              {
                "bg-secondary/40 ring-secondary": fish_types.includes(fishName),
                "bg-transparent ring-primary-dark dark:ring-primary":
                  !fish_types.includes(fishName),
              }
            )}
            key={fishName}
          >
            {fishName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FishTypeSelector;
