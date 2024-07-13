import { Slide } from '@prisma/client';

import './styles/slideItem.css';

type Props = {
  slide: Slide;
  children: React.ReactNode;
};

export default function SlideItem({ slide, children }: Props) {
  const width = slide.duration * 20;

  return (
    <li id={slide.id} className="slide_item" style={{ minWidth: width }}>
      {children}
    </li>
  );
}
