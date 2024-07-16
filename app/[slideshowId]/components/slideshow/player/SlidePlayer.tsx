'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';

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

  const QUERY_NAME = 'slideIndex';

  const [, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [, setElapsedTime] = useState(0);

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

  const nextSlide = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const currentIndex = parseInt(params.get(QUERY_NAME) || '');

    const newIndex = currentIndex + 1;

    if (newIndex < slidesLength) {
      params.set(QUERY_NAME, String(newIndex));
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, slidesLength, pathname, replace]);

  useEffect(() => {
    if (pause) return;

    const slide = document.getElementById(slideId) as HTMLLIElement;

    const interval = setInterval(() => {
      startTransition(() => {
        setElapsedTime((prev) => {
          if (prev < slideDuration) {
            if (slide) fillSlide(slide, prev + 1);
            return prev + 1;
          } else {
            clearInterval(interval);
            emptySlide(slide);
            nextSlide();
            return prev;
          }
        });
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      emptySlide(slide);
    };
  }, [pause, slideDuration, slideId, fillSlide, nextSlide]);

  return null;
}
