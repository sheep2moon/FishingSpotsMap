import {
  type NewSpotFields,
  useNewSpotStore,
} from "../../zustand/new-spot-store";
import React from "react";
import InputWithLabel from "../ui/input-with-label";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  IconBedFilled,
  IconFish,
  IconInfoCircle,
  IconListDetails,
  IconMoonFilled,
  IconTent,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// export type FormData = {
//   name: string;
//   contact: string;
//   province: string;
//   city: string;
//   night: boolean;
//   tent: boolean;
//   accommodation: boolean;
//   spinning: boolean;
// };
const DetailsForm = () => {
  const {
    name,
    accommodation,
    area,
    city,
    tent,
    contact,
    night_fishing,
    province,
    setField,
    spinning,
  } = useNewSpotStore((store) => store);

  const handleInputChange = <K extends keyof NewSpotFields>(
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setField(e.target.name as K, e.target.value as NewSpotFields[K]);
  };

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>
            <IconInfoCircle size="2rem" />
            Podstawowe informacje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InputWithLabel
            label="Nazwa"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <InputWithLabel
            label="Miasto"
            name="city"
            value={city}
            onChange={handleInputChange}
          />
          <InputWithLabel
            label="Województwo"
            name="province"
            value={province}
            onChange={handleInputChange}
          />
          <InputWithLabel
            label="Kontakt"
            name="contact"
            value={contact}
            onChange={handleInputChange}
          />
        </CardContent>
      </Card>
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
              onCheckedChange={() => setField("tent", !tent)}
              checked={tent}
            />
            <Label className="flex items-center gap-2" htmlFor="spinning">
              <IconFish />
              Można łowić na spinning
            </Label>
            <Switch
              id="spinning"
              onCheckedChange={() => setField("spinning", !spinning)}
              checked={spinning}
            />
            <Label className="flex items-center gap-2" htmlFor="night_fishing">
              <IconMoonFilled />
              Łowienie w nocy
            </Label>
            <Switch
              id="night_fishing"
              onCheckedChange={() => setField("night_fishing", !night_fishing)}
              checked={night_fishing}
            />
            <Label className="flex items-center gap-2" htmlFor="accommodation">
              <IconBedFilled />
              Nocleg
            </Label>
            <Switch
              id="accommodation"
              onCheckedChange={() => setField("accommodation", !accommodation)}
              checked={accommodation}
            />
          </div>
          <InputWithLabel
            className="mt-8"
            label="Powierzchnia łowiska"
            name="area"
            value={area}
            onChange={handleInputChange}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DetailsForm;
