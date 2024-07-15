"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { getSlideById } from "../data/slide";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function createAction(slideshowId: string, slideId: string) {
    let pendingAction = null;

    try {
        const slide = await getSlideById(slideId);

        if (!slide) {
            pendingAction = () => redirect(`/${slideshowId}?error=Slide could not be found`)
            throw new Error('Slide could not be found', { cause: '' })
        }

        const result = await generateText({
            model: google("models/gemini-1.5-pro-latest"),
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Describe the image in no more than 30 words.' },
                        {
                            type: 'image',
                            image:
                                slide.src,
                        },
                    ],
                },
            ],
        });

        if (!result.text) {
            pendingAction = () => redirect(`/${slideshowId}?error=Cannot use AI at this time. ${result.responseMessages}`)
        }

        const resultText = result.text || undefined;

        await db.slide.update({
            where: {
                id: slideId
            },
            data: {
                alt: resultText
            }
        })
    } catch (error) {
        pendingAction = () => redirect(`/${slideshowId}?error=Something went wrong`);
    }

    if (pendingAction) return pendingAction();

    revalidatePath(`/${slideshowId}`)
}