import { Input, type InputProps } from "../common/Input";
import ChoiceInput from "../common/ChoiceInput";
import {
  type NewSpotFields,
  useNewSpotStore,
} from "../../zustand/new-spot-store";
import React from "react";

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
      <NewSpotInput
        label="Nazwa"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <NewSpotInput
        label="Miasto"
        name="city"
        value={city}
        onChange={handleInputChange}
      />
      <NewSpotInput
        label="Województwo"
        name="province"
        value={province}
        onChange={handleInputChange}
      />
      <NewSpotInput
        label="Kontakt"
        name="contact"
        value={contact}
        onChange={handleInputChange}
      />
      <NewSpotInput
        label="Powierzchnia łowiska"
        name="area"
        value={area}
        onChange={handleInputChange}
      />
      <NewSpotToggle
        name="tent"
        label="Można rozłożyć namiot"
        onChange={() => setField("tent", !tent)}
        checked={tent}
      />
      <NewSpotToggle
        name="spinning"
        label="Można rozłożyć namiot"
        onChange={() => setField("spinning", !spinning)}
        checked={spinning}
      />
      <NewSpotToggle
        name="night_fishing"
        label="Można łowić w nocy"
        onChange={() => setField("night_fishing", !night_fishing)}
        checked={night_fishing}
      />
      <NewSpotToggle
        name="accommodation"
        label="Możliwość noclegu"
        onChange={() => setField("accommodation", !accommodation)}
        checked={accommodation}
      />
    </>
  );
};

export default DetailsForm;

const NewSpotInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { name: keyof NewSpotFields }
>((props, ref) => {
  return <Input ref={ref} {...props} />;
});
NewSpotInput.displayName = "NewSpotInput";

const NewSpotToggle = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "error"> & { name: keyof NewSpotFields }
>((props, ref) => {
  return <ChoiceInput ref={ref} {...props} />;
});
NewSpotToggle.displayName = "NewSpotToggle";
