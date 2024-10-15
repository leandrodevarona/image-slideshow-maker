"use client";

import { MouseEvent, Suspense } from "react";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import useEditOrDeleteSlides from "@ism/app/[slideshowId]/lib/hooks/useEditOrDeleteSlides";
import clsx from "clsx";

import "./styles/editSlideItems.css";

function Component() {
  const { isPending, isEditing, editSlides } = useEditOrDeleteSlides();

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    editSlides();
  };

  return (
    <button
      className={clsx("edit_slides__button", "primary_button")}
      aria-label="Edit slides button"
      title={isEditing ? "Cancel edit slides" : "Edit slides"}
      disabled={isPending}
      onClick={handleOnClick}
    >
      {isEditing ? <Cross1Icon /> : <Pencil1Icon />}
    </button>
  );
}

export default function EditSlideItems() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
