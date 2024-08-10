import { useState } from "react";
import { api } from "./services/api";
import { Recipe } from "./types/recipe";
import RecipeComponent from "./components/recipe-component";
import { prompter } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Input } from './components/ui/input';

export default function App() {
  const [ingredients, setIngredients] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>();

  const handleClick = async () => {
    const teste = prompter(ingredients);
    setRecipe(null);

    await api
      .post("/chat/completions", teste)
      .then((response) => {
        const parsedContent = JSON.parse(
          response.data.choices[0].message.content,
        );
        setRecipe(parsedContent);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-100">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            className="min-w-[320px] resize-none p-2 text-start placeholder:text-center"
            placeholder="Insira seus ingredientes disponíveis"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <Button variant={"outline"} onClick={handleClick}>
            Generate
          </Button>
        </div>

        {recipe && <RecipeComponent recipe={recipe} />}
      </div>
    </div>
  );
}
