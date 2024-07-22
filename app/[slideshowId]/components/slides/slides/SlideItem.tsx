import { Slide } from '@prisma/client';
import clsx from 'clsx';

import './styles/slideItem.css';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

type Props = {
  slide: Slide;
  isCurrent: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function SlideItem({
  slide,
  isCurrent = false,
  onClick,
  children,
}: Props) {
  const width = slide.duration * 20;

  return (
    <li
      id={slide.id}
      className="slide_item"
      style={{ minWidth: width }}
      onClick={onClick}
    >
      {isCurrent && <BookmarkFilledIcon color="#0dfd0d" />}
      {children}
    </li>
  );
}
