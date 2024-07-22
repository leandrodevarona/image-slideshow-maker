import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import EditSlideItemDuration from '../forms/EditSlideItemDuration';

type Props = {
  slideshowId: string;
  slide: Slide;
  isCurrent: boolean;
};

export default function SlideItemToEdit({
  slideshowId,
  slide,
  isCurrent,
}: Props) {
  return (
    <SlideItem slide={slide} isCurrent={isCurrent}>
      <EditSlideItemDuration
        slideshowId={slideshowId}
        slideId={slide.id}
        slideDuration={slide.duration}
      />
    </SlideItem>
  );
}
