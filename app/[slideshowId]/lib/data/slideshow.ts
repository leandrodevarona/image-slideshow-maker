import { notFound, redirect } from "next/navigation";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function generateNewSlideshowAndRedirect() {
    let pendingAction = null;

    let slideshowId = null;

    try {
        const newSlideshow = await db.slideshow.create({})

        if (!newSlideshow) return notFound();

        slideshowId = newSlideshow.id
    } catch (error) {
        pendingAction = () => redirect(`?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(Routes.home)
    if (slideshowId) redirect(`${Routes.slideshow(slideshowId)}`);
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