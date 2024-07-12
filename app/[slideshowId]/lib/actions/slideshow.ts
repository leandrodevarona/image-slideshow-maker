"use server";

import { redirect } from "next/navigation";
import { db } from "../db";

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