'use client';

import { MouseEvent } from 'react';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import useEditOrDeleteSlides from '@ism/app/[slideshowId]/lib/hooks/useEditOrDeleteSlides';

import './styles/editSlideItems.css';

export default function EditSlideItems() {
  const { isPending, isEditing, editSlides } = useEditOrDeleteSlides();

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    editSlides();
  };

  return (
    <button
      className="edit_slide__items primary_button"
      aria-label="Edit slides button"
      title={isEditing ? 'Cancel edit slides' : 'Edit slides'}
      disabled={isPending}
      onClick={handleOnClick}
    >
      {isEditing ? <Cross1Icon /> : <Pencil1Icon />}
    </button>
  );
}
