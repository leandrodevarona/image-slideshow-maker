'use client';

import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';

import './styles/slideItemSelectable.css';

type Props = {
  slide: Slide;
  isCurrent: boolean;
};

export default function SlideItemSelectable({ slide, isCurrent }: Props) {
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
