import RecipeComponent from "./components/recipe-component";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      className="flex min-h-screen w-full flex-col items-center justify-center "
    >
      <div className="flex flex-col gap-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-[620px] items-center gap-4 "
          >
            <Input
              className="resize-none p-2 text-center placeholder:text-center"
              placeholder="Insira seus ingredientes disponíveis"
              {...form.register("ingredients")}
            />

            <Button variant={"outline"} type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Generating
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </Form>

        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0.0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.0, y: -40 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center justify-center"
            >
              <RecipeComponent recipe={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
