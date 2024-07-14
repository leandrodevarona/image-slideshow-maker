import { db } from "../db";

export async function getSlideshowById(id: string) {
    try {
        const slideshow = await db.slideshow.findUnique({
            where: {
                id
            },
            include: {
                slides: true
            }
        });

        return slideshow;
    } catch (error) {
        return null;
    }
}