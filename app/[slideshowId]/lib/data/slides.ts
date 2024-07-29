import { db } from '../db';

export async function getSlideById(slideId: string) {
  try {
    const slide = await db.slide.findUnique({
      where: {
        id: slideId,
      },
    });

    return slide;
  } catch (error) {
    return null;
  }
}
