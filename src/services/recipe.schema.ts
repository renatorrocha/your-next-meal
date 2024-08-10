import { z } from "zod";

export const InputIngredients = z.object({
  ingredients: z.string().min(1, "Insira ingredientes validos"),
});

export type InputIngredientsSchema = z.infer<typeof InputIngredients>;
