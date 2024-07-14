'use client';

import { useTransition } from 'react';
import SaveIcon from './assets/SaveIcon';
import { saveChangesAction } from '@ism/app/[slideshowId]/lib/actions/slideshow';

import './styles/saveChanges.css';

type Props = {
  slideshowId: string;
};

export default function SaveChanges({ slideshowId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleOnClick = () => {
    startTransition(() => {
      const slideList = document.getElementById(slideshowId);

      if (slideList) {
        const slides = slideList.getElementsByTagName('li');

        const slideIds = Array.from(slides).map((li) => li.id);

        saveChangesAction(slideshowId, slideIds);
      }
    });
  };

  return (
    <button
      className="save_changes primary_button"
      aria-label="Save changes button"
      title="Save changes"
      disabled={isPending}
      onClick={handleOnClick}
    >
      <SaveIcon />
    </button>
  );
}
