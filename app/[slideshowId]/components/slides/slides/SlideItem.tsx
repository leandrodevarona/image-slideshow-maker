import { Slide } from '@prisma/client';
import { ComponentBooleanIcon } from '@radix-ui/react-icons';

import './styles/slideItem.css';

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
      {isCurrent && (
        <ComponentBooleanIcon
          className="slide_item__bookmark"
          color="#0dfd0d"
          width={20}
          height={20}
        />
      )}
      {children}
    </li>
  );
}
