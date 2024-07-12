import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import MakeSlidesSortable from './MakeSlidesSortable';

import './styles/slideController.css';

type Props = {
  slides: Slide[];
};

function NoSlides() {
  return <div className="slide_controller">No slides</div>;
}

export default function SlideController({ slides }: Props) {
  const id = 'slide-controller';

  if (!slides || slides.length <= 0) return <NoSlides />;

  return (
    <ul id={id} className="slide_controller">
      {slides.map((slide) => (
        <SlideItem key={slide.id} slide={slide} />
      ))}
      <MakeSlidesSortable slideListId={id} />
    </ul>
  );
}
