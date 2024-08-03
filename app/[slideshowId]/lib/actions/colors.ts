'use server';

import { db } from '../db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Routes } from '@ism/app/lib/utils/routes';
import { getSlideshowById } from '../data/slideshow';
import { getColors } from '../utils/colors';

export async function createAction(slideshowId: string, formData: FormData) {
  const colorsTheme = formData.get('colors_theme')?.toString();

  if (!colorsTheme || colorsTheme.length > 20) return;

  let recipe = null;

  try {
    recipe = await getColors(colorsTheme);
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
  revalidatePath(`${Routes.landingPage(slideshowId)}`);
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
  revalidatePath(`${Routes.landingPage(slideshowId)}`);
}
