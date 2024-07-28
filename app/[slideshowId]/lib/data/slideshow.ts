import { notFound, redirect } from "next/navigation";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { Routes } from "@ism/app/lib/utils/routes";

export async function generateNewSlideshowAndRedirect() {
    let slideshowId = null;

    try {
        const newSlideshow = await db.slideshow.create({})

        if (!newSlideshow) return notFound();

        slideshowId = newSlideshow.id
    } catch (error) {
        console.log(error);
        redirect(`?error=Something went wrong`);
    }

    revalidatePath(Routes.home);

    if (slideshowId) redirect(`${Routes.slideshow(slideshowId)}`);
}

export async function getSlideshowById(id: string) {
    try {
        const slideshow = await db.slideshow.findUnique({
            where: {
                id
            },
            include: {
                slides: true,
                colorPalette: true
            }
        });

        return slideshow;
    } catch (error) {
        return null;
    }
}