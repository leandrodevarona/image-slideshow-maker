'use server';

import { redirect } from 'next/navigation';
import { db } from '../db';
import { getSlideshowById } from '../data/slideshow';
import { revalidatePath } from 'next/cache';
import { Routes } from '@ism/app/lib/utils/routes';

export async function createAction(name?: string) {
  try {
    await db.slideshow.create({
      data: {
        name,
      },
    });
  } catch (error) {
    redirect(`?error=Something went wrong`);
  }

  revalidatePath(Routes.home);
}

export async function updateAction(slideshowId: string, formData: FormData) {
  try {
    const name = formData.get('name')?.toString() || undefined;

    if (!name) return null;

    await db.slideshow.update({
      where: {
        id: slideshowId,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  revalidatePath(`${Routes.slideshow(slideshowId)}`);
}

export async function saveChangesAction(
  slideshowId: string,
  slideIds: string[]
) {
  const slideshow = await getSlideshowById(slideshowId);

  const slides = slideshow?.slides;

  if (!slides || slides.length <= 0) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Slideshow don't work`);
  }

  try {
    const updateOperations = slideIds.map((slideId, index) => {
      return db.slide.update({
        where: { id: slideId },
        data: { index },
      });
    });

    // Ejecutar todas las operaciones en una transacción
    await db.$transaction(updateOperations);
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  revalidatePath(`${Routes.slideshow(slideshowId)}`);
  revalidatePath(`${Routes.landingPage(slideshowId)}`);
}
