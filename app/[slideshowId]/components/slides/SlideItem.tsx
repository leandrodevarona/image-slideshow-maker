import { Slide } from '@prisma/client';

import './styles/slideItem.css';

type Props = {
  slide: Slide;
};

export default function SlideItem({ slide }: Props) {
  const width = slide.duration * 20;

  return (
    <li id={slide.id} className="slide_item" style={{ minWidth: width }}>
      <span>{slide.duration}</span>
    </li>
  );
}
