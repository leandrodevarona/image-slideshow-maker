import { Slide } from '@prisma/client';
import MakeSlidesSortable from './MakeSlidesSortable';
import { sortSlides } from '../../lib/utils/slides';
import {
  SlideItemSelectable,
  SlideItemToDelete,
  SlideItemToEdit,
} from './slides';
import clsx from 'clsx';

import './styles/slideController.css';

type Props = {
  className?: string;
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
  className,
  slideshowId,
  slides,
  currentSlideId,
  editing = false,
  deleting = false,
}: Props) {
  if (!slides || slides.length <= 0) return <NoSlides />;

  const sortedSlides = sortSlides(slides);

  return (
    <ul id={slideshowId} className={clsx('slide_controller', className)}>
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
