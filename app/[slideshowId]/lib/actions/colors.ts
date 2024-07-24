"use server"

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { AI_MODEL } from "../constants/ai";
import { z } from 'zod';
import { db } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Routes } from "@ism/app/lib/utils/routes";

export async function createAction(slideshowId: string, formData: FormData) {
    let pendingAction = null;

    const colorsTheme = formData.get('colors_theme')?.toString();

    if (!colorsTheme || colorsTheme.length > 10) return;

    try {
        const { object } = await generateObject({
            model: google(AI_MODEL),
            schema: z.object({
                recipe: z.object({
                    background: z.string(),
                    border: z.string(),
                    prompt: z.string(),
                    text: z.string(),
                    theme: z.enum(['dark', 'light']),
                })
            }),
            prompt: `Generate a color palette from the theme "${colorsTheme}".
            Depending on the colors of the palette generated in the theme attribute, you must tell me if the palette is dark or light.
            Each attribute (background, border, message) must be a string that has three numbers separated by a comma, which represent the color in RGB.
            In the text attribute you must also return the same RGB format, but this color must contrast with the color saved in the "prompt" attribute.`
        })

        if (!object.recipe) {
            pendingAction = () => redirect(
                `${Routes.slideshow(slideshowId)}?error=Cannot use AI at this time.`
            )
            throw new Error('Cannot use AI at this time.')
        }

        await db.colorPalette.upsert({
            where: {
                slideshowId
            },
            update: {
                ...object.recipe
            },
            create: {
                ...object.recipe,
                slideshowId,
                name: colorsTheme
            }
        });
    } catch (error) {
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}

export async function deleteAction(slideshowId: string) {
    let pendingAction = null;

    try {
        await db.colorPalette.delete({
            where: {
                slideshowId
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}