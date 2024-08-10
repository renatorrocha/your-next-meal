import { Recipe } from "@/types/recipe";
import TimestampComponent from "./timestamp-component";
import { Clock, Hourglass } from "lucide-react";

export default function RecipeComponent({ recipe }: { recipe: Recipe }) {
  const {
    cooking_time,
    ingredients,
    instructions,
    preparation_time,
    recipe_name,
  } = recipe;

  return (
    <article className="flex w-[620px] flex-col gap-4 rounded-md border bg-white p-4 shadow-md">
      <header className="flex items-center justify-between">
        <p className="max-w-full truncate text-pretty text-xl font-bold sm:max-w-[300px]">
          {recipe_name}
        </p>

        <div className="mt-2 flex items-center gap-4 sm:mt-0">
          <TimestampComponent Icon={Hourglass} label={cooking_time} />
          <TimestampComponent Icon={Clock} label={preparation_time} />
        </div>
      </header>

      <ul className="list-disc pl-5">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mb-1">
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-1 whitespace-pre-line text-pretty leading-relaxed">
        {instructions.map((instruction, index) => (
          <p key={index}>{instruction}</p>
        ))}
      </div>
    </article>
  );
}
