import { z } from "zod";

export const discussionSchema = z.object({
  title: z.string().min(20, "Tytuł powinien mieć minimum 20 znaków"),
  content: z
    .string()
    .min(50, "Treść dyskusji powinna zawierać minimum 50 znaków"),
  tags: z.array(z.string()).min(1, "Dodaj przynajmniej jeden tag/kategorie"),
});
