"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import Unsplash from "../utils/unsplash";
import { getSlideshowById } from "../data/slideshow";
import { Routes } from "@ism/app/lib/utils/routes";

export async function createAction(slideshowId: string, formData: FormData) {
    const photoId = formData.get('photo')?.toString();

    if (!photoId) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Photo is required`);
    }

    const photo = (await Unsplash.photos.get({ photoId })).response;

    if (!photo) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Photo could not be found`);
    }

    const slideshow = await getSlideshowById(slideshowId);
    const slides = slideshow?.slides;

    if (!slides || slides.length <= 0) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Slideshow don't work`);
    }

    const maxIndex = slides.reduce((max, slide) => Math.max(max, slide.index), -1);
    const newIndex = maxIndex + 1;

    try {
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
        redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}

export async function updateAction(slideshowId: string, slideId: string, formData: FormData) {
    const duration = Number(formData.get('duration')?.toString()) || undefined;
    const alt = formData.get('alt')?.toString() || undefined;

    if (duration && (duration < 5 || duration > 20)) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Duration value is invalid`);
    }

    try {
        await db.slide.update({
            where: {
                id: slideId,
            },
            data: {
                duration,
                alt
            }
        })
    } catch (error) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}

export async function deleteAction(slideshowId: string, slideId: string) {
    try {
        await db.slide.delete({
            where: {
                id: slideId
            }
        })
    } catch (error) {
        redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}