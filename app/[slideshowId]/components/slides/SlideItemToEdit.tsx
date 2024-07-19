import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import EditSlideItemDuration from './forms/EditSlideItemDuration';

type Props = {
  slideshowId: string;
  slide: Slide;
};

export default function SlideItemToEdit({ slideshowId, slide }: Props) {
  return (
    <SlideItem slide={slide}>
      <EditSlideItemDuration
        slideshowId={slideshowId}
        slideId={slide.id}
        slideDuration={slide.duration}
      />
    </SlideItem>
  );
}
