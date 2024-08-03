import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { AI_MODEL } from '../constants/ai';

export async function getColors(colorsTheme: string) {
  const { object } = await generateObject({
    model: google(AI_MODEL),
    schema: z.object({
      recipe: z.object({
        background: z.string(),
        border: z.string(),
        prompt: z.string(),
        text: z.string(),
        theme: z.enum(['dark', 'light']),
      }),
    }),
    prompt: `Generate a color palette from the theme "${colorsTheme}".
                  Depending on the colors generated in the palette, the theme attribute must be defined. If the colors are lighter than dark, the theme will be light, otherwise it will be dark.
                  Each attribute (background, border, message) must be a string that has three numbers separated by a comma, which represent the color in RGB.
                  The color saved in border must always be different from the background, but maintaining the relationship of the defined theme.
                  In the text attribute you must also return the same RGB format, but this color must contrast with the color saved in the "prompt" attribute.`,
  });

  return object.recipe;
}
