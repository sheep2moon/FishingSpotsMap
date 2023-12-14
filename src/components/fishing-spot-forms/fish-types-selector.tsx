import React, { forwardRef } from "react";
import { Toggle } from "../ui/toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IconFish } from "@tabler/icons-react";
import { type FishType } from "../../types/global";
import { fishTypeNames } from "../../const/fish-type-names";

type FishTypeSelectorProps = {
  fishTypes: FishType[];
  setFishTypes: (fishTypes: FishType[]) => void;
};

const FishTypeSelector = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FishTypeSelectorProps
>(({ fishTypes, setFishTypes, ...props }, ref) => {
  const handleFishClick = (fish: FishType) => {
    if (fishTypes.includes(fish)) {
      const newFishTypes = fishTypes.filter((typeName) => typeName !== fish);
      setFishTypes(newFishTypes);
    } else {
      const newFishTypes = [...fishTypes, fish];
      setFishTypes(newFishTypes);
    }
  };
  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconFish size="2rem" />
          Gatunki ryb
        </CardTitle>
        <CardDescription>Wybierz występujące gatunki ryb</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {fishTypeNames.map((fishName) => (
          <Toggle
            size="lg"
            variant="outline"
            pressed={fishTypes.includes(fishName)}
            onPressedChange={() => handleFishClick(fishName)}
            key={fishName}
            aria-label={`toggle ${fishName}`}
          >
            {fishName}
          </Toggle>
        ))}
      </CardContent>
    </Card>
  );
});

FishTypeSelector.displayName = "FishTypeSpotForm";
export { FishTypeSelector };
