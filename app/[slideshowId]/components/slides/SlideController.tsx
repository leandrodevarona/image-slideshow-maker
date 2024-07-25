import { Slide } from '@prisma/client';
import MakeSlidesSortable from './MakeSlidesSortable';
import { sortSlides } from '../../lib/utils/slides';
import SlideItemToDelete from './slides/SlideItemToDelete';
import SlideItemSelectable from './slides/SlideItemSelectable';
import SlideItemToEdit from './slides/SlideItemToEdit';

import './styles/slideController.css';

type Props = {
  slideshowId: string;
  slides: Slide[];
  currentSlideId?: string;
  editing?: boolean;
  deleting?: boolean;
};

function NoSlides() {
  return <div className="slide_controller">No slides</div>;
}

export default function SlideController({
  slideshowId,
  slides,
  currentSlideId,
  editing = false,
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
              isCurrent={currentSlideId === slide.id}
            />
          ))
        : editing
        ? sortedSlides.map((slide) => (
            <SlideItemToEdit
              key={'to-edit' + slide.id}
              slideshowId={slideshowId}
              slide={slide}
              isCurrent={currentSlideId === slide.id}
            />
          ))
        : sortedSlides.map((slide) => (
            <SlideItemSelectable
              key={slide.id}
              slide={slide}
              isCurrent={currentSlideId === slide.id}
            />
          ))}
      <MakeSlidesSortable slideshowId={slideshowId} />
    </ul>
  );
}
