import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import EditSlideItem from './form/EditSlideItem';

import './styles/slideItemToEdit.css';

type Props = {
  slideshowId: string;
  slide: Slide;
};

export default function SlideItemToEdit({ slideshowId, slide }: Props) {
  return (
    <SlideItem slide={slide}>
      <EditSlideItem
        slideshowId={slideshowId}
        slideId={slide.id}
        slideDuration={slide.duration}
      />
    </SlideItem>
  );
}
