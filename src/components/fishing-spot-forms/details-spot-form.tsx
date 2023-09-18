import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  IconBedFilled,
  IconFish,
  IconListDetails,
  IconMoonFilled,
  IconTent,
} from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import InputWithLabel from "../ui/input-with-label";

type DetailsSpotFormProps = {
  tent: boolean;
  spinning: boolean;
  night_fishing: boolean;
  accommodation: boolean;
  area: string;
  setTent: (v: boolean) => void;
  setSpinning: (v: boolean) => void;
  setNightFishing: (v: boolean) => void;
  setAccommodation: (v: boolean) => void;
  setArea: (area: string) => void;
};

const DetailsSpotForm = ({
  tent,
  spinning,
  night_fishing,
  accommodation,
  area,
  setTent,
  setSpinning,
  setNightFishing,
  setAccommodation,
  setArea,
}: DetailsSpotFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <IconListDetails />
          Szczegóły
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[4fr_1fr] space-y-5">
          <Label className="mt-5 flex items-center gap-2" htmlFor="tent">
            <IconTent />
            Możliwość rozłożenia namiotu
          </Label>
          <Switch
            id="tent"
            onCheckedChange={() => setTent(!tent)}
            checked={tent}
          />
          <Label className="flex items-center gap-2" htmlFor="spinning">
            <IconFish />
            Można łowić na spinning
          </Label>
          <Switch
            id="spinning"
            onCheckedChange={() => setSpinning(!spinning)}
            checked={spinning}
          />
          <Label className="flex items-center gap-2" htmlFor="night_fishing">
            <IconMoonFilled />
            Łowienie w nocy
          </Label>
          <Switch
            id="night_fishing"
            onCheckedChange={() => setNightFishing(!night_fishing)}
            checked={night_fishing}
          />
          <Label className="flex items-center gap-2" htmlFor="accommodation">
            <IconBedFilled />
            Nocleg
          </Label>
          <Switch
            id="accommodation"
            onCheckedChange={() => setAccommodation(!accommodation)}
            checked={accommodation}
          />
        </div>
        <InputWithLabel
          className="mt-8"
          label="Powierzchnia łowiska"
          name="area"
          value={area}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setArea(e.target.value)
          }
        />
      </CardContent>
    </Card>
  );
};

export default DetailsSpotForm;
