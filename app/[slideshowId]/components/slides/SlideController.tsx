import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import MakeSortable from '@ism/app/components/common/sortable/MakeSortable';

import './styles/slideController.css';

type Props = {
  slides: Slide[];
};

export default function SlideController({ slides }: Props) {
  const id = 'slide-controller';

  if (!slides || slides.length <= 0) return <div>No slides</div>;

  return (
    <ul id={id} className="slide_controller">
      {slides.map((slide) => (
        <SlideItem key={slide.id} slide={slide} />
      ))}
      <MakeSortable elemId={id} />
    </ul>
  );
}
