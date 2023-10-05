import { z } from "zod";
import { fileSchema } from "./file.schema";
import { tagSchema } from "./tag.schema";

export const discussionSchema = z.object({
  title: z.string().min(20, "Tytuł powinien mieć minimum 20 znaków"),
  content: z
    .string()
    .min(50, "Treść dyskusji powinna zawierać minimum 50 znaków"),
  tags: tagSchema.array().min(1, "Dodaj przynajmniej jeden tag/kategorie"),
  attachments: fileSchema.array().max(4, "Maksymalna ilość załączników to 4"),
});

export type DiscussionSchemaData = z.infer<typeof discussionSchema>;
