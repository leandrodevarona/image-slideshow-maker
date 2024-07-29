import { notFound, redirect } from 'next/navigation';
import { db } from '../db';
import { revalidatePath } from 'next/cache';
import { Routes } from '@ism/app/lib/utils/routes';

export async function generateNewSlideshowAndRedirect() {
  let slideshowId = null;

  try {
    const newSlideshow = await db.slideshow.create({});

    if (!newSlideshow) return notFound();

<<<<<<< HEAD
        slideshowId = newSlideshow.id
    } catch (error) {
        console.log(error);
        redirect(`?error=Something went wrong`);
    }
=======
    slideshowId = newSlideshow.id;
  } catch (error) {
    redirect(`?error=Something went wrong`);
  }
>>>>>>> 96c656ca90beec9f91431d91da9644c68c91464f

  revalidatePath(Routes.home);

  if (slideshowId) redirect(`${Routes.slideshow(slideshowId)}`);
}

export async function getSlideshowById(id: string) {
  try {
    const slideshow = await db.slideshow.findUnique({
      where: {
        id,
      },
      include: {
        slides: true,
        colorPalette: true,
      },
    });

    return slideshow;
  } catch (error) {
    return null;
  }
}
