import { z } from "zod";
import { fileSchema } from "./file.schema";

export const catchSchema = z.object({
  images: z.array(fileSchema).min(1, "Dodaj przynajmniej jedno zdjęcie"),
  weight: z.number({
    invalid_type_error: "Waga musi być liczbą",
    required_error: "Waga ryby jest wymagana",
  }),
  length: z.number({
    invalid_type_error: "Długość musi być liczbą",
    required_error: "Długość ryby jest wymagana",
  }),
  date: z.date().optional(),
  fishType: z
    .string({ required_error: "Wybierz gatunek ryby" })
    .min(1, "Wybierz gatunek ryby"),
  description: z.string().optional(),
  fishingSpotId: z
    .string({ required_error: "Wybierz łowisko na którym złowiono rybe." })
    .min(1, "Wybierz łowisko na którym złowiono rybe."),
});

export const mutationCatchSchema = catchSchema.extend({
  images: z.array(z.string()).min(1),
});
