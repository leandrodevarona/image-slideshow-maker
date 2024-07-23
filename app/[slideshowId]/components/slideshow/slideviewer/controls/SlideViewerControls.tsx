import { Suspense } from 'react';
import PlayPause from './player/PlayPause';
import AiControls from './ai/AiControls';

import './styles/slideViewerControls.css';
import CurrentSlide from './player/CurrentSlide';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function SlideViewerControls({ slideshowId, slideId }: Props) {
  return (
    <div className="slide_viewer__controls">
      <section>
        <Suspense>
          <PlayPause />
        </Suspense>
        <CurrentSlide slideshowId={slideshowId} currentSlideId={slideId} />
      </section>
      <section className="controls_ai">
        <AiControls slideshowId={slideshowId} slideId={slideId} />
      </section>
    </div>
  );
}
