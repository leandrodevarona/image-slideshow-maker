import { Slide } from '@prisma/client';
import { CSSProperties } from 'react';

import './styles/slideItem.css';

type Props = {
  slide: Slide;
};

export default function SlideItem({ slide }: Props) {
  const width = `${slide.duration * 50}px`;

  return (
    <li
      id={slide.id}
      className="slide_item"
      style={{ '--width': width } as CSSProperties}
    >
      <span>{slide.duration}</span>
    </li>
  );
}
