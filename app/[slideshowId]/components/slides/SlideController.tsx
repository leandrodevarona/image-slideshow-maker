import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import SlideItemToDelete from './SlideItemToDelete';
import MakeSlidesSortable from './MakeSlidesSortable';

import './styles/slideController.css';

type Props = {
  slideshowId: string;
  slides: Slide[];
  deleting?: boolean;
};

function NoSlides() {
  return <div className="slide_controller">No slides</div>;
}

export default function SlideController({
  slideshowId,
  slides,
  deleting = false,
}: Props) {
  if (!slides || slides.length <= 0) return <NoSlides />;

  return (
    <ul id={slideshowId} className="slide_controller">
      {deleting
        ? slides.map((slide) => (
            <SlideItemToDelete
              key={'to-delete' + slide.id}
              slideshowId={slideshowId}
              slide={slide}
            />
          ))
        : slides.map((slide) => (
            <SlideItem key={slide.id} slide={slide}>
              <span>{slide.duration}</span>
            </SlideItem>
          ))}
      <MakeSlidesSortable slideshowId={slideshowId} />
    </ul>
  );
}
