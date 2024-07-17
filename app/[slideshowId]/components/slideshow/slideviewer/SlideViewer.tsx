import { Slide } from '@prisma/client';
import Image from 'next/image';
import SlidePrompt from '../../slides/prompts/SlidePrompt';
import SlideViewerControls from './controls/SlideViewerControls';
import clsx from 'clsx';

import './styles/slideViewer.css';

type Props = {
  className?: string;
  imgElemId: string;
  slide?: Slide;
  children?: React.ReactNode;
};

function NoSlides() {
  return <div className="slide_viewer">Slide not found</div>;
}

export default function SlideViewer({
  className,
  imgElemId,
  slide,
  children,
}: Props) {
  if (!slide) return <NoSlides />;

  return (
    <div className={clsx('slide_viewer', className)}>
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
