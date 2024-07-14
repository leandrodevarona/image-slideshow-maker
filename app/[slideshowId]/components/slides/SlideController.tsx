import { Slide } from '@prisma/client';
import SlideItemToDelete from './SlideItemToDelete';
import MakeSlidesSortable from './MakeSlidesSortable';
import { sortSlides } from '../../lib/utils/slides';

import './styles/slideController.css';
import SlideItemSelectable from './SlideItemSelectable';

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

  const sortedSlides = sortSlides(slides);

  return (
    <ul id={slideshowId} className="slide_controller">
      {deleting
        ? sortedSlides.map((slide) => (
            <SlideItemToDelete
              key={'to-delete' + slide.id}
              slideshowId={slideshowId}
              slide={slide}
            />
          ))
        : sortedSlides.map((slide) => (
            <SlideItemSelectable key={slide.id} slide={slide} />
          ))}
      <MakeSlidesSortable slideshowId={slideshowId} />
    </ul>
  );
}
