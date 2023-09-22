import { z } from "zod";
import { fishTypeNames } from "../src/const/fish-type-names";

export const fishingSpotSchema = z.object({
  name: z.string().min(5, "Nazwa musi być dłuższa niż 5 znaków"),
  province: z.string().nonempty("Wprowadź nazwę województwa"),
  city: z.string().nonempty("Wprowadź nazwę miasta"),
  area: z.string(),
  night_fishing: z.boolean(),
  tent: z.boolean(),
  accommodation: z.boolean(),
  spinning: z.boolean(),
  lat: z.number().min(0.00001, "Wskaż lokalizacje"),
  lng: z.number(),
  contact_page: z
    .string()
    .url("Adres URL strony łowiska nieprawidłowy")
    .nullish(),
  contact_phone: z
    .number()
    .min(9, "Długość telefonu powinna wynosić 9")
    .max(9, "Telefon powinien mieć 9 cyfr")
    .nullish(),
  contact_email: z.string().email("Email kontaktowy nieprawidłowy").nullish(),
  contact_instagram: z
    .string()
    .url("Adres URL Instagrama nieprawidłowy")
    .nullish(),
  fish_types: z.array(z.enum(fishTypeNames)),
  prices: z.array(z.object({ title: z.string(), value: z.string() })),
  images: z.array(
    z.object({
      comment: z.string(),
      source: z.string(),
      file: z.custom<File>((v) => v instanceof File),
    })
  ),
  description: z
    .string()
    .min(50, "Opis powinien zawierać minimum 50 znaków")
    .max(5000, "Opis powinien zawierać maksymalnie 8000 znaków"),
});

export type FishingSpotData = z.infer<typeof fishingSpotSchema>;
export type SpotImage = FishingSpotData["images"][number];
