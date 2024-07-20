"use server"

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { AI_MODEL } from "../constants/ai";
import { z } from 'zod';
import { db } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Routes } from "@ism/app/lib/utils/routes";

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
            prompt: `Generate a color palette from the theme "${theme}". 
            Each attribute (background, border, message) must be a string that has three numbers separated by a comma, which represent the color in RGB.`
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
                slideshowId
            }
        });
    } catch (error) {
        console.log(error)
        pendingAction = () => redirect(`${Routes.slideshow(slideshowId)}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`${Routes.slideshow(slideshowId)}`)
}