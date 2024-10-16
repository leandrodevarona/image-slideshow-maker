import { google } from "@ai-sdk/google";
import { AI_MODEL } from "@ism/app/[slideshowId]/lib/constants/ai";
import { generateObject } from "ai";
import { z } from "zod";

export async function getPrompts(theme: string, amount: number) {
  const { object } = await generateObject({
    model: google(AI_MODEL),
    schema: z.object({
      prompts: z.array(z.string()),
    }),
    prompt: `Generate an array of "${amount}" number of texts of no more than 30 words related to topic "${theme}". 
             These texts must follow a logical sequence and talk about interesting things about topic "${theme}".
             The last text in the array must be a conclusion of the topic discussed. 
             This array of texts must be saved in the "prompts" variable.`,
  });

  return object.prompts;
}
