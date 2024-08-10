import { useState } from "react";
import { api } from "./services/api";
import { Recipe } from "./types/recipe";
import RecipeComponent from "./components/recipe-component";
import { prompter } from "./lib/utils";

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
    <div className="flex min-h-screen w-full flex-col items-center bg-zinc-100">
      <div onClick={() => console.log(recipe)}>
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button onClick={handleClick}>Prompt</button>
      </div>

      {recipe && <RecipeComponent recipe={recipe} />}
    </div>
  );
}
