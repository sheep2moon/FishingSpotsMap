import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  IconAddressBook,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconWorldWww,
} from "@tabler/icons-react";
import InputWithLabel from "../ui/input-with-label";
import { type FSpotData } from "../../../schemas/fishing-spot.schema";

type ContactSpotFormProps = Pick<
  FSpotData,
  "contact_email" | "contact_instagram" | "contact_page" | "contact_phone"
> & {
  setPhone: (phone: number) => void;
  setPage: (pageUrl: string) => void;
  setInstagram: (instagramUrl: string) => void;
  setEmail: (email: string) => void;
};

const ContactSpotForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ContactSpotFormProps
>(
  (
    {
      contact_phone,
      contact_email,
      contact_instagram,
      contact_page,
      setEmail,
      setInstagram,
      setPage,
      setPhone,
      ...props
    },
    ref
  ) => (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconAddressBook />
          Kontakt
        </CardTitle>
        <CardDescription>Dane kontakowe łowiska</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:grid sm:grid-cols-2">
        <InputWithLabel
          label={
            <>
              <IconPhone /> Telefon
            </>
          }
          id="phone"
          type="tel"
          value={contact_phone || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(parseInt(e.target.value))
          }
        />
        <InputWithLabel
          label={
            <>
              <IconWorldWww /> Strona Internetowa
            </>
          }
          id="page"
          type="url"
          value={contact_page || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPage(e.target.value)
          }
        />
        <InputWithLabel
          label={
            <>
              <IconBrandInstagram /> Instagram
            </>
          }
          id="instagram"
          value={contact_instagram || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInstagram(e.target.value)
          }
        />
        <InputWithLabel
          label={
            <>
              <IconMail /> Email
            </>
          }
          type="email"
          id="email"
          value={contact_email || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </CardContent>
    </Card>
  )
);

ContactSpotForm.displayName = "ContactSpotForm";

export { ContactSpotForm };
