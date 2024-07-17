'use client';

import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import useSlidePass from '../../lib/hooks/useSlidePass';

import './styles/slideItemSelectable.css';

type Props = {
  slide: Slide;
};

export default function SlideItemSelectable({ slide }: Props) {
  const { isPending, seeSlide } = useSlidePass();

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
