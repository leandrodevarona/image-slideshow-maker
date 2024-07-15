import { Slide } from '@prisma/client';
import Image from 'next/image';
import SlidePrompt from '../../slides/prompts/SlidePrompt';
import SlideViewerControls from './controls/SlideViewerControls';

import './styles/slideViewer.css';

type Props = {
  slideshowId: string;
  slide?: Slide;
};

function NoSlides() {
  return <div className="slide_viewer">Slide not found</div>;
}

export default function SlideViewer({ slideshowId, slide }: Props) {
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
      <SlideViewerControls slideshowId={slideshowId} slideId={slide.id} />
    </div>
  );
}
