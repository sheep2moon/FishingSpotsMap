import { z } from "zod";

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
});
