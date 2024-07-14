"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import Unsplash from "../utils/unsplash";
import { getSlideshowById } from "../data/slideshow";

export async function createAction(slideshowId: string, formData: FormData) {
    console.log(slideshowId)
    let pendingAction = null;
    try {
        const photoId = formData.get('photo')?.toString();

        if (!photoId) {
            pendingAction = () => redirect(`/${slideshowId}?error=Photo is required`)
            throw new Error('Photo is required', { cause: 'Photo is required' })
        }

        const photo = (await Unsplash.photos.get({ photoId })).response;

        if (!photo) {
            pendingAction = () => redirect(`/${slideshowId}?error=Photo could not be found`)
            throw new Error('Photo could not be found')
        }

        const slideshow = await getSlideshowById(slideshowId);
        const slides = slideshow?.slides;

        if (!slides || slides.length < 0) {
            pendingAction = () => redirect(`/${slideshowId}?error=Slideshow don't work`)
            throw new Error("Slideshow don't work")
        }

        await db.slide.create({
            data: {
                slideshowId,
                src: photo?.urls.regular,
                index: slides.length
            }
        })

    } catch (error) {
        console.log(error)
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}

export async function updateAction(slideshowId: string, slideId: string, duration: number) {
    let pendingAction = null;

    try {
        await db.slide.update({
            where: {
                id: slideId,
            },
            data: {
                duration
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}

export async function deleteAction(slideshowId: string, slideId: string) {
    let pendingAction = null;

    try {
        await db.slide.delete({
            where: {
                id: slideId
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}