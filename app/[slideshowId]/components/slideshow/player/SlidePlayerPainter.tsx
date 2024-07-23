'use client';

import { useCallback } from 'react';
import SlidePlayer from './SlidePlayer';

type Props = {
  slideId: string;
  slideDuration: number;
  slidesLength: number;
  imgElemId: string;
  pause?: boolean;
};

export default function SlidePlayerPainter({
  slideId,
  slideDuration,
  slidesLength,
  imgElemId,
  pause,
}: Props) {
  const slideColor = '#b4b9bc';
  const rangeColor = '#b00505';

  const fillSlide = useCallback(
    (value: number) => {
      const slide = document.getElementById(slideId);
      if (slide) {
        const rangeDistance = slideDuration - 0;
        const fromPosition = 0;
        const toPosition = value;
        slide.style.background = `linear-gradient(
    to right,
    ${slideColor} 0%,
    ${slideColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${slideColor} ${(toPosition / rangeDistance) * 100}%, 
    ${slideColor} 100%)`;
      }
    },
    [slideDuration, slideId]
  );

  const emptyFillSlide = () => {
    const slide = document.getElementById(slideId);
    if (slide) {
      slide.style.background = slideColor;
    }
  };

  const scrollIntoViewSlide = () => {
    const item = document.getElementById(slideId);

    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <SlidePlayer
      slideDuration={slideDuration}
      slidesLength={slidesLength}
      imgElemId={imgElemId}
      pause={pause}
      onUpdateTime={(time) => {
        fillSlide(time);
        scrollIntoViewSlide();
      }}
      onStopTime={emptyFillSlide}
    />
  );
}
