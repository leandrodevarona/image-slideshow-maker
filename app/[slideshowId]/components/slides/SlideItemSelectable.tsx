'use client';

import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import useSeeSlide from '../../lib/hooks/useSeeSlide';

import './styles/slideItemSelectable.css';

type Props = {
  slide: Slide;
};

export default function SlideItemSelectable({ slide }: Props) {
  const { isPending, seeSlide } = useSeeSlide();

  const handleOnClick = () => {
    seeSlide(slide.index);
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
