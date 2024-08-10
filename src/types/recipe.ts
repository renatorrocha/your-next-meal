export type Recipe = {
  ingredients: [{ name: string; quantity: string }];
  instructions: [string];
  recipe_name: string;
  cooking_time: string;
  preparation_time: string;
};
