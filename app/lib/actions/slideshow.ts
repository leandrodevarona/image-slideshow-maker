"use server";

import { db } from "@ism/app/[slideshowId]/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Routes } from "../utils/routes";

export async function createAction() {
  let slideshowId = null;

  try {
    const slideshow = await db.slideshow.create({});

    slideshowId = slideshow.id;
  } catch (error) {
    redirect(`?error=Something went wrong`);
  }

  revalidatePath(Routes.home);
  redirect(Routes.slideshow(slideshowId));
}
