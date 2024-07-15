import { Suspense } from 'react';
import { Slide } from '@prisma/client';
import SlideItemToDelete from './SlideItemToDelete';
import MakeSlidesSortable from './MakeSlidesSortable';
import { sortSlides } from '../../lib/utils/slides';
import SlideItemSelectable from './SlideItemSelectable';
import SlideItemToEdit from './SlideItemToEdit';

import './styles/slideController.css';

type Props = {
  slideshowId: string;
  slides: Slide[];
  editing?: boolean;
  deleting?: boolean;
};

function NoSlides() {
  return <div className="slide_controller">No slides</div>;
}

export default function SlideController({
  slideshowId,
  slides,
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
            />
          ))
        : editing
        ? sortedSlides.map((slide) => (
            <SlideItemToEdit
              key={'to-edit' + slide.id}
              slideshowId={slideshowId}
              slide={slide}
            />
          ))
        : sortedSlides.map((slide) => (
            <Suspense key={slide.id}>
              <SlideItemSelectable slide={slide} />
            </Suspense>
          ))}
      <MakeSlidesSortable slideshowId={slideshowId} />
    </ul>
  );
}
