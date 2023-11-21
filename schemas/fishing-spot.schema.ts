import { z } from "zod";
import { fishTypeNames } from "../src/const/fish-type-names";

export const fishingSpotSchema = z.object({
  name: z.string().min(5, "Nazwa musi być dłuższa niż 5 znaków"),
  province: z.string().min(1, "Wprowadź nazwę województwa"),
  city: z.string().min(1, "Wprowadź nazwę miasta"),
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
    .refine(
      (phoneNumber) => phoneNumber.toString().length === 9,
      "Numer telefonu powinien mieć 9 cyfr"
    )
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
      id: z.string(),
      comment: z.string().nullable(),
      source: z.string().nullable(),
    })
  ),
  description: z
    .string()
    .min(50, "Opis powinien zawierać minimum 50 znaków")
    .max(5000, "Opis powinien zawierać maksymalnie 8000 znaków"),
});

export type FSpotData = z.infer<typeof fishingSpotSchema>;
export type FSpotImageWithFile = FSpotData["images"][number] & { file: File };
