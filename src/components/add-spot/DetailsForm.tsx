import {
  type NewSpotFields,
  useNewSpotStore,
} from "../../zustand/new-spot-store";
import React, { useEffect } from "react";
import InputWithLabel from "../ui/input-with-label";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  IconBedFilled,
  IconFish,
  IconMoonFilled,
  IconTent,
} from "@tabler/icons-react";

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

  useEffect(() => {
    console.log(tent);
  }, [tent]);

  return (
    <>
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
      <InputWithLabel
        label="Powierzchnia łowiska"
        name="area"
        value={area}
        onChange={handleInputChange}
      />
      <div className="grid max-w-md grid-cols-[3fr_1fr] space-y-5">
        <Label className="flex items-center gap-2" htmlFor="tent">
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
    </>
  );
};

export default DetailsForm;
