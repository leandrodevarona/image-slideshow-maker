"use server"

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { AI_MODEL } from "../constants/ai";
import { z } from 'zod';
import { db } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAction(slideshowId: string, theme: string) {
    let pendingAction = null;

    try {
        const { object } = await generateObject({
            model: google(AI_MODEL),
            schema: z.object({
                recipe: z.object({
                    background: z.string(),
                    border: z.string(),
                    prompt: z.string()
                })
            }),
            prompt: `Generate a color palette from the theme ${theme}. 
            Each attribute (background, border, prompt) must be a single color in hexadecimal.`
        })

        if (!object.recipe) {
            pendingAction = () => redirect(
                `${Routes.slideshow(slideshowId)}?error=Cannot use AI at this time.`
            )
            throw new Error('Cannot use AI at this time.')
        }

        await db.colorPalette.create({
            data: {
                slideshowId,
                ...object.recipe
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}