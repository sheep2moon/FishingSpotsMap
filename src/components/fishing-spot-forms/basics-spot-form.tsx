import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconInfoCircle } from "@tabler/icons-react";
import InputWithLabel from "../ui/input-with-label";

type BasicsSpotFormProps = {
  name: string;
  city: string;
  province: string;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  setProvince: (province: string) => void;
};

const BasicsSpotForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BasicsSpotFormProps
>(({ name, city, province, setName, setCity, setProvince, ...props }, ref) => (
  <Card ref={ref} {...props}>
    <CardHeader>
      <CardTitle>
        <IconInfoCircle />
        Podstawowe informacje
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <InputWithLabel
        label="Nazwa"
        name="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <InputWithLabel
        label="Miasto"
        name="city"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      <InputWithLabel
        label="Województwo"
        name="province"
        value={province}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProvince(e.target.value)
        }
      />
      {/* <InputWithLabel
          label="Kontakt"
          name="contact"
          value={contact}
          onChange={handleInputChange}
        /> */}
    </CardContent>
  </Card>
));

BasicsSpotForm.displayName = "BasicsSpotForm";

export { BasicsSpotForm };
