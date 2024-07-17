'use client';

import useElapsedTime from '@ism/app/[slideshowId]/lib/hooks/useElapsedTime';
import useSlidePlayer from '@ism/app/[slideshowId]/lib/hooks/useSlidePlayer';
import { useCallback, useEffect } from 'react';

type Props = {
  slideId: string;
  slideDuration: number;
  pause?: boolean;
  slidesLength: number;
};

export default function SlidePlayer({
  slideId,
  slideDuration,
  pause = false,
  slidesLength,
}: Props) {
  const slideColor = '#b4b9bc';
  const rangeColor = '#ff0000';

  const { elapsedTime } = useElapsedTime();

  const { next: nextSlide, pause: pauseSlide } = useSlidePlayer(slidesLength);

  const fillSlide = useCallback(
    (slide: HTMLLIElement, value: number) => {
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
    [slideDuration]
  );

  const emptySlide = (slide: HTMLLIElement) => {
    if (slide) {
      slide.style.background = slideColor;
    }
  };

  useEffect(() => {
    const slide = document.getElementById(slideId) as HTMLLIElement;
    if (elapsedTime <= slideDuration) {
      if (slide) fillSlide(slide, elapsedTime);
    } else {
      emptySlide(slide);
      nextSlide();
    }

    return () => emptySlide(slide);
  }, [elapsedTime, slideDuration, slideId, fillSlide, nextSlide]);

  useEffect(() => {
    if (pause === true) {
      const slide = document.getElementById(slideId) as HTMLLIElement;
      pauseSlide();
      if (slide) {
        emptySlide(slide);
      }
    }
  }, [pause, slideId, pauseSlide]);

  return null;
}
