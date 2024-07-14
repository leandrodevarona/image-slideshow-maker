"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import Unsplash from "../utils/unsplash";
import { getSlideshowById } from "../data/slideshow";

export async function createAction(slideshowId: string, formData: FormData) {
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

        const maxIndex = slides.reduce((max, slide) => Math.max(max, slide.index), -1);
        const newIndex = maxIndex + 1;

        await db.slide.create({
            data: {
                slideshowId,
                src: photo?.urls.regular,
                width: photo.width,
                height: photo.height,
                index: newIndex
            }
        })

    } catch (error) {
        console.log(error)
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}

export async function updateAction(slideshowId: string, slideId: string, formData: FormData) {
    let pendingAction = null;

    try {
        const duration = Number(formData.get('duration')?.toString()) || undefined;

        if (duration && (duration < 3 || duration > 20)) {
            pendingAction = () => redirect(`/${slideshowId}?error=Duration value is invalid`)
            throw new Error('Duration value is invalid')
        }

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