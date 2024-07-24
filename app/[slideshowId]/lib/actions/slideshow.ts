"use server";

import { redirect } from "next/navigation";
import { db } from "../db";
import { getSlideshowById } from "../data/slideshow";
import { revalidatePath } from "next/cache";
import { Routes } from "@ism/app/lib/utils/routes";

export async function createAction(name?: string) {
    let pendingAction = null;

    try {
        const slideshow = await db.slideshow.create({
            data: {
                name
            }
        })

        return slideshow;
    } catch (error) {
        pendingAction = () => redirect(`?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(Routes.home)
}

export async function updateAction(slideshowId: string, formData: FormData) {
    let pendingAction = null;

    try {
        const name = formData.get('name')?.toString() || undefined;

        if (!name) return null;

        await db.slideshow.update({
            where: {
                id: slideshowId
            },
            data: {
                name
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}

export async function saveChangesAction(slideshowId: string, slideIds: string[]) {
    let pendingAction = null;

    try {
        const slideshow = await getSlideshowById(slideshowId);

        const slides = slideshow?.slides;

        if (!slides || slides.length <= 0) {
            pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Slideshow don't work`)
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
        console.log(error)
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}