import { Slide } from '@prisma/client';
import Image from 'next/image';

import './styles/slideViewer.css';
import SlidePrompt from './textarea/SlidePrompt';

type Props = {
  slide?: Slide;
};

function NoSlides() {
  return <div className="slide_viewer">Slide not found</div>;
}

export default function SlideViewer({ slide }: Props) {
  if (!slide) return <NoSlides />;

  const imgId = 'slide_viewer__img' + slide.id;

  return (
    <div className="slide_viewer">
      <Image
        id={imgId}
        src={slide.src}
        alt={slide.alt || 'Slide photo'}
        width={slide.width}
        height={slide.height}
      />
      <SlidePrompt slide={slide} imgElemId={imgId} />
    </div>
  );
}
