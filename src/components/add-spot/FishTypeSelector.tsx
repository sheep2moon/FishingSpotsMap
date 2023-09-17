import React from "react";
import { type FishType, fishTypes } from "../../const/fish-types";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import clsx from "clsx";
import { Toggle } from "../ui/toggle";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IconFish } from "@tabler/icons-react";

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
    <Card>
      <CardHeader>
        <CardTitle>
          <IconFish size="2rem" />
          Gatunki ryb
        </CardTitle>
        <CardDescription>Wybierz występujące gatunki ryb</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {fishTypes.map((fishName) => (
          <Toggle
            size="lg"
            variant="outline"
            pressed={fish_types.includes(fishName)}
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
};

export default FishTypeSelector;
