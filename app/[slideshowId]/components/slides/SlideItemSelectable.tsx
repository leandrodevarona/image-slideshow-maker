'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import { useTransition } from 'react';

import './styles/slideItemSelectable.css';

type Props = {
  slide: Slide;
};

export default function SlideItemSelectable({ slide }: Props) {
  const QUERY_NAME = 'slideIndex';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOnClick = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentIndex = parseInt(params.get(QUERY_NAME) || '');

      if (currentIndex !== slide.index) {
        params.set(QUERY_NAME, String(slide.index));
        replace(`${pathname}?${params.toString()}`);
      }
    });
  };

  return (
    <SlideItem slide={slide} onClick={handleOnClick}>
      {isPending ? (
        <div className="slide_loader" />
      ) : (
        <span>{slide.duration}s</span>
      )}
    </SlideItem>
  );
}
