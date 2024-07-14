import { Slide } from '@prisma/client';
import Image from 'next/image';

import './styles/slideViewer.css';

type Props = {
  slide?: Slide;
};

function NoSlides() {
  return <div className="slide_viewer">Slide not found</div>;
}

export default function SlideViewer({ slide }: Props) {
  if (!slide) return <NoSlides />;

  return (
    <div className="slide_viewer">
      <Image
        src={slide.src}
        alt={slide.alt || 'Slide photo'}
        width={slide.width}
        height={slide.height}
      />
    </div>
  );
}
