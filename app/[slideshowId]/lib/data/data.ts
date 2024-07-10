import { db } from "../db";

export async function getSlideshows() {
    try {
        const slideshows = await db.slideshow.findMany();

        return slideshows;
    } catch (error) {
        console.log(error)
        return null;
    }
}

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