import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import DeleteSlideItem from './form/DeleteSlideItem';

type Props = {
  slideshowId: string;
  slide: Slide;
};

export default function SlideItemToDelete({
  slideshowId,
  slide,
}: Props) {
  return (
    <SlideItem slide={slide}>
      <DeleteSlideItem slideshowId={slideshowId} slideId={slide.id} />
    </SlideItem>
  );
}
