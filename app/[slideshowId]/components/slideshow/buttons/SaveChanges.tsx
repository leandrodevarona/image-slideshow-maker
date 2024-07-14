'use client';

import { useCallback, useEffect, useTransition } from 'react';
import SaveIcon from './assets/SaveIcon';
import { saveChangesAction } from '@ism/app/[slideshowId]/lib/actions/slideshow';

import './styles/saveChanges.css';

type Props = {
  slideshowId: string;
};

export default function SaveChanges({ slideshowId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleOnClick = useCallback(() => {
    startTransition(() => {
      const slideList = document.getElementById(slideshowId);

      if (slideList) {
        const slides = slideList.getElementsByTagName('li');

        const slideIds = Array.from(slides).map((li) => li.id);

        saveChangesAction(slideshowId, slideIds);
      }
    });
  }, [slideshowId]);

  useEffect(() => {
    const intervalId = setInterval(handleOnClick, 300000); // 300000 ms = 5 minutos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [handleOnClick]);

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
