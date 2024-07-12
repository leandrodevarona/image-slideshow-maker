import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import MakeSlidesSortable from './MakeSlidesSortable';
import { sortSlides } from '../../lib/utils/slides';
import { updateAction } from '../../lib/actions/slide';

import './styles/slideController.css';

type Props = {
  slideshowId: string;
  slides: Slide[];
};

function NoSlides() {
  return <div className="slide_controller">No slides</div>;
}

export default function SlideController({ slideshowId, slides }: Props) {
  if (!slides || slides.length <= 0) return <NoSlides />;

  const sortedSlides = sortSlides(slides);

  return (
    <ul id={slideshowId} className="slide_controller">
      {sortedSlides.map((slide) => (
        <SlideItem key={slide.id} slide={slide} />
      ))}
      <MakeSlidesSortable
        slideshowId={slideshowId}
        changeIndexAction={updateAction}
      />
    </ul>
  );
}
