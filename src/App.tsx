import RecipeComponent from "./components/recipe-component";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "./components/ui/form";
import {
  InputIngredients,
  InputIngredientsSchema,
} from "./services/recipe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateRecipe } from "./services/generate-recipe";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";

export default function App() {
  const {
    data,
    mutateAsync: server_generateRecipe,
    isLoading,
  } = useMutation({
    mutationFn: generateRecipe,
  });

  const form = useForm<InputIngredientsSchema>({
    resolver: zodResolver(InputIngredients),
  });

  const onSubmit = async (data: InputIngredientsSchema) => {
    server_generateRecipe(data.ingredients);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50">
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

        {isLoading && (
          <article className="flex h-[320px] max-w-[620px] flex-col items-center justify-center gap-4 rounded-md border bg-white p-4 shadow-md">
            <Loader2 className="animate-spin" />
          </article>
        )}
        {data && <RecipeComponent recipe={data} />}
      </div>
    </div>
  );
}
