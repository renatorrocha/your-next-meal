import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prompter(ingredients: string, preference?: string) {
  const baseContent = `Eu tenho esses ingredientes: ${ingredients}.`;

  const baseJson = {
    ingredients: [{ name: "string", quantity: "string" }],
    instructions: ["string"],
    recipe_name: "string",
    cooking_time: "string",
    preparation_time: "string",
  };

  const userContent = preference
    ? `${baseContent} Eu quero fazer algo ${preference}. Por favor, sugira uma receita, em Portuguese, com a seguinte estrutura em formato objeto JSON puro, sem delimitadores de código: ${JSON.stringify(baseJson)}`
    : `${baseContent} Por favor, sugira uma receita, em Portuguese, com a seguinte estrutura em formato objeto JSON puro, sem delimitadores de código: ${JSON.stringify(baseJson)}`;

  return {
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista culinário com amplo conhecimento de receitas práticas. Você fornece sugestões com base nos ingredientes disponíveis e nas preferências do usuário, focando em soluções simples e deliciosas.",
      },
      {
        role: "user",
        content: userContent,
      },
    ],
  };
}
