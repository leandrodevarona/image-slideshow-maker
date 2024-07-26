import { Slide } from '@prisma/client';
import { ComponentBooleanIcon } from '@radix-ui/react-icons';

import './styles/slideItem.css';
import clsx from 'clsx';

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
      className={clsx('slide_item', isCurrent && 'is_current')}
      style={{ minWidth: width }}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
