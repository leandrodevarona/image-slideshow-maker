import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import DeleteSlideItem from '../forms/DeleteSlideItem';

type Props = {
  slideshowId: string;
  slide: Slide;
  isCurrent: boolean;
};

export default function SlideItemToDelete({
  slideshowId,
  slide,
  isCurrent,
}: Props) {
  return (
    <SlideItem slide={slide} isCurrent={isCurrent}>
      <DeleteSlideItem slideshowId={slideshowId} slideId={slide.id} />
    </SlideItem>
  );
}
