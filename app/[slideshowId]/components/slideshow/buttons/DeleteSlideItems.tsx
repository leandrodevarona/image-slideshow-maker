'use client';

import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { MouseEvent, Suspense } from 'react';
import useEditOrDeleteSlides from '@ism/app/[slideshowId]/lib/hooks/useEditOrDeleteSlides';

import './styles/deleteSlideItems.css';

function Component() {
  const { isPending, isDeleting, deleteSlides } = useEditOrDeleteSlides();

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    deleteSlides();
  };

  return (
    <button
      className="delete_slide__items primary_button"
      aria-label="Delete slides button"
      title={isDeleting ? 'Cancel delete slides' : 'Delete slides'}
      disabled={isPending}
      onClick={handleOnClick}
    >
      {isDeleting ? <Cross2Icon /> : <TrashIcon />}
    </button>
  );
}

export default function DeleteSlideItems() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
