import { Slide } from '@prisma/client';
import Image from 'next/image';
import clsx from 'clsx';

import './styles/slideViewer.css';

type Props = {
  className?: string;
  imgElemId: string;
  slide?: Slide;
  fullScreen?: boolean;
  children?: React.ReactNode;
};

function NoSlides({ className }: { className?: string }) {
  return (
    <div className={clsx('slide_viewer', className)}>Please, add new Slide</div>
  );
}

export default function SlideViewer({
  className,
  imgElemId,
  slide,
  fullScreen = false,
  children,
}: Props) {
  if (!slide) return <NoSlides className={className} />;

  return (
    <div
      className={clsx('slide_viewer', fullScreen && 'full_screen', className)}
    >
      <Image
        id={imgElemId}
        src={slide.src}
        alt={slide.alt || 'Slide photo'}
        width={slide.width}
        height={slide.height}
      />
      {children}
    </div>
  );
}
