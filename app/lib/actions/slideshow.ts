'use server';

import { db } from '@ism/app/[slideshowId]/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Routes } from '../utils/routes';
import { getPhotos } from '@ism/app/[slideshowId]/lib/data/photos';
import { getColors } from '@ism/app/[slideshowId]/lib/utils/colors';
import { capitalize } from '../utils/utils';

export async function createAction() {
  let slideshowId = null;

  try {
    const slideshow = await db.slideshow.create({});

    slideshowId = slideshow.id;
  } catch (error) {
    redirect(`?error=Something went wrong`);
  }

  revalidatePath(Routes.home);
  redirect(Routes.slideshow(slideshowId));
}

export async function autoCreateAction(formData: FormData) {
  const theme = formData.get('theme')?.toString();

  if (!theme) redirect(`${Routes.home}?error=Theme is required`);

  if (theme.length > 20)
    redirect(`${Routes.home}?error=Use less than 20 characters for the theme`);

  const photos = await getPhotos(theme);

  if (!photos || photos.length <= 0)
    redirect(
      `${Routes.home}?error=Unsplash library is not working at the moment. Please try again later or with another theme.`
    );

  let colorPalette = null;

  try {
    colorPalette = await getColors(theme);
  } catch (error) {
    redirect(`${Routes.home}?error=Cannot use AI at this time.`);
  }

  let slideshow = null;

  try {
    const name = capitalize(theme);

    slideshow = await db.slideshow.create({
      data: {
        name,
        colorPalette: {
          create: {
            name: theme,
            ...colorPalette,
          },
        },
      },
    });
  } catch (error) {
    redirect(`?error=Something went wrong`);
  }

  const slideshowId = slideshow.id;

  try {
    const createOperations = photos.map((photo, index) => {
      return db.slide.create({
        data: {
          slideshowId,
          src: photo?.urls.regular,
          width: photo.width,
          height: photo.height,
          index,
        },
      });
    });

    await db.$transaction(createOperations);
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  redirect(Routes.slideshow(slideshowId));
}
