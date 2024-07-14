import { Slide } from '@prisma/client';

import './styles/slideItem.css';

type Props = {
  slide: Slide;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function SlideItem({ slide, onClick, children }: Props) {
  const width = slide.duration * 20;

  return (
    <li
      id={slide.id}
      className="slide_item"
      style={{ minWidth: width }}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
