'use client';

import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';
import { Suspense } from 'react';

import './styles/slideItemSelectable.css';

type Props = {
  slide: Slide;
  isCurrent: boolean;
};

function Component({ slide, isCurrent }: Props) {
  const { isPending, seeSlide } = useSeeSlide();

  const handleOnClick = () => {
    seeSlide(slide.index);
  };

  return (
    <SlideItem slide={slide} isCurrent={isCurrent} onClick={handleOnClick}>
      {isPending ? (
        <div className="slide_loader" />
      ) : (
        <span>{slide.duration}s</span>
      )}
    </SlideItem>
  );
}

export default function SlideItemSelectable(props: Props) {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
}
