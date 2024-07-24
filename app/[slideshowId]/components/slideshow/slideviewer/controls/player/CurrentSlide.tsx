'use client';

import { ComponentBooleanIcon } from '@radix-ui/react-icons';

import './styles/currentSlide.css';

type Props = {
  slideshowId: string;
  currentSlideId?: string;
};

export default function CurrentSlide({ slideshowId, currentSlideId }: Props) {
  const handleOnClick = () => {
    const listElem = document.getElementById(slideshowId);

    if (listElem) {
      if (!currentSlideId) return;
      const item = document.getElementById(currentSlideId);

      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.error(`Elemento con ID ${currentSlideId} no encontrado.`);
      }
    }
  };

  return (
    <button
      className="current_slide__button primary_button centered_button"
      title="See this slide on the timeline"
      aria-label="See this slide on the timeline"
      onClick={handleOnClick}
    >
      <ComponentBooleanIcon />
    </button>
  );
}
