"use server";

import { redirect } from "next/navigation";
import { db } from "../db";
import { getSlideshowById } from "../data/slideshow";
import { revalidatePath } from "next/cache";

export async function createAction(name?: string) {
    try {
        const slideshow = await db.slideshow.create({
            data: {
                name
            }
        })

        return slideshow;
    } catch (error) {
        redirect('/?error=Something went wrong')
    }
}

export async function saveChangesAction(slideshowId: string, slideIds: string[]) {
    let pendingAction = null;

    try {
        const slideshow = await getSlideshowById(slideshowId);

        const slides = slideshow?.slides;

        if (!slides || slides.length <= 0) {
            pendingAction = () => redirect(`/${slideshowId}?error=Slideshow don't work`)
            throw new Error("Slideshow don't work")
        }

        const updateOperations = slideIds.map((slideId, index) => {
            return db.slide.update({
                where: { id: slideId },
                data: { index }
            });
        });

        // Ejecutar todas las operaciones en una transacción
        await db.$transaction(updateOperations);
    } catch (error) {
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}