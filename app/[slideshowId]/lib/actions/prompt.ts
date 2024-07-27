'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { getSlideById } from '../data/slides';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { AI_MODEL } from '../constants/ai';
import { Routes } from '@ism/app/lib/utils/routes';

export async function createAction(slideshowId: string, slideId: string) {
  const slide = await getSlideById(slideId);

  if (!slide) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Slide could not be found`);
  }

  let result = null;

  try {
    result = await generateText({
      model: google(AI_MODEL),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe the image in no more than 30 words.',
            },
            {
              type: 'image',
              image: slide.src,
            },
          ],
        },
      ],
    });
  } catch (error) {
    redirect(
      `${Routes.slideshow(slideshowId)}?slideIndex=${
        slide.index
      }&error=Cannot use AI at this time.`
    );
  }

  const resultText = result.text || undefined;

  try {
    await db.slide.update({
      where: {
        id: slideId,
      },
      data: {
        alt: resultText,
      },
    });
  } catch (error) {
    redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
  }

  revalidatePath(`${Routes.slideshow(slideshowId)}`);
  revalidatePath(`${Routes.landingPage(slideshowId)}`);
}
