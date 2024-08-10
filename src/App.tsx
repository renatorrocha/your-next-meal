import { useState } from "react";
import { api } from "./services/api";
import { Recipe } from "./types/recipe";
import RecipeComponent from "./components/recipe-component";
import { parseJsonResponse, prompter } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "./components/ui/form";
import {
  InputIngredients,
  InputIngredientsSchema,
} from "./services/recipe.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function App() {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const form = useForm<InputIngredientsSchema>({
    resolver: zodResolver(InputIngredients),
  });

  const onSubmit = async (data: InputIngredientsSchema) => {
    const teste = prompter(data.ingredients);
    setRecipe(null);

    await api
      .post("/chat/completions", teste)
      .then((response) => {
        const parsedContent = parseJsonResponse(
          response.data.choices[0].message.content,
        );
        setRecipe(parsedContent);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-100">
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-4"
          >
            <Input
              className="min-w-[320px] resize-none p-2 text-start placeholder:text-center"
              placeholder="Insira seus ingredientes disponíveis"
              {...form.register("ingredients")}
            />

            <Button variant={"outline"} type="submit">
              Generate
            </Button>
          </form>
        </Form>

        {recipe && <RecipeComponent recipe={recipe} />}
      </div>
    </div>
  );
}
