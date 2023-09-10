import { z } from "zod";

export const catchError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    console.log(error);
  }
};
