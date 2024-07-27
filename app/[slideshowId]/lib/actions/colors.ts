'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { AI_MODEL } from '../constants/ai';
import { z } from 'zod';
import { db } from '../db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Routes } from '@ism/app/lib/utils/routes';
import { getSlideshowById } from '../data/slideshow';

export async function createAction(slideshowId: string, formData: FormData) {
  const colorsTheme = formData.get('colors_theme')?.toString();

  if (!colorsTheme || colorsTheme.length > 20) return;

  let recipe = null;

  try {
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

    recipe = object.recipe;
  } catch (error) {
    redirect(
      `${Routes.slideshow(slideshowId)}?error=Cannot use AI at this time.`
    );
  }

  try {
    await db.colorPalette.upsert({
      where: {
        slideshowId,
      },
      update: {
        ...recipe,
      },
      create: {
        ...recipe,
        slideshowId,
        name: colorsTheme,
      },
    });
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  revalidatePath(`${Routes.slideshow(slideshowId)}`);
}

export async function deleteAction(slideshowId: string) {
  try {
    const slideshow = await getSlideshowById(slideshowId);

    if (!slideshow?.colorPalette) return;

    await db.colorPalette.delete({
      where: {
        slideshowId,
      },
    });
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  revalidatePath(`${Routes.slideshow(slideshowId)}`);
}
