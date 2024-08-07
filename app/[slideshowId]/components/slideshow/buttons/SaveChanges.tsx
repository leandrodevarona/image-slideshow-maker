'use client';

import { useEffect } from 'react';
import SaveIcon from './assets/SaveIcon';
import useReorderSlides from '@ism/app/[slideshowId]/lib/hooks/useReorderSlides';

import './styles/saveChanges.css';

type Props = {
  slideshowId: string;
};

export default function SaveChanges({ slideshowId }: Props) {
  const { isPending, reorder } = useReorderSlides(slideshowId);

  useEffect(() => {
    const intervalId = setInterval(reorder, 300000); // 300000 ms = 5 minutos
    return () => clearInterval(intervalId);
  }, [reorder]);

  return (
    <button
      className="save_changes primary_button"
      aria-label="Save changes button"
      title="Save changes"
      disabled={isPending}
      onClick={reorder}
    >
      <SaveIcon />
    </button>
  );
}
