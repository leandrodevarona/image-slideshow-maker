'use client';

import { useEffect } from 'react';
import SaveIcon from './assets/SaveIcon';
import useSaveChanges from '@ism/app/[slideshowId]/lib/hooks/useSaveChanges';

import './styles/saveChanges.css';

type Props = {
  slideshowId: string;
};

export default function SaveChanges({ slideshowId }: Props) {
  const { isPending, saveChanges } = useSaveChanges(slideshowId);

  useEffect(() => {
    const intervalId = setInterval(saveChanges, 300000); // 300000 ms = 5 minutos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [saveChanges]);

  return (
    <button
      className="save_changes primary_button"
      aria-label="Save changes button"
      title="Save changes"
      disabled={isPending}
      onClick={saveChanges}
    >
      <SaveIcon />
    </button>
  );
}
