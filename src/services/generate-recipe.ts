import { parseJsonResponse, prompter } from "@/lib/utils";
import { api } from "./api";

export const generateRecipe = async (ingredients: string) => {
  const messagePrompt = prompter(ingredients);

  try {
    const response = await api.post("/chat/completions", messagePrompt);
    const parsedContent = parseJsonResponse(
      response.data.choices[0].message.content,
    );

    console.log(parsedContent);

    return parsedContent;
  } catch (err) {
    console.error("teste", err);
    throw err;
  }
};
