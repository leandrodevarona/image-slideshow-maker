'use client';

import { useCallback, useEffect, useTransition } from 'react';
import SaveIcon from './assets/SaveIcon';
import { saveChangesAction } from '@ism/app/[slideshowId]/lib/actions/slideshow';

import './styles/saveChanges.css';
import useSlideOrder from '@ism/app/[slideshowId]/lib/hooks/useSlideOrder';

type Props = {
  slideshowId: string;
};

export default function SaveChanges({ slideshowId }: Props) {
  const [isPending, startTransition] = useTransition();

  const { getSlideOrder } = useSlideOrder(slideshowId);

  const handleOnClick = useCallback(() => {
    startTransition(() => {
      const slideOrderIds = getSlideOrder();

      if (slideOrderIds) {
        saveChangesAction(slideshowId, slideOrderIds);
      }
    });
  }, [slideshowId, getSlideOrder]);

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
