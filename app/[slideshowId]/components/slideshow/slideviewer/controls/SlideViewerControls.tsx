import { Suspense } from 'react';
import PlayPause from './player/PlayPause';
import CreateSlidePrompt from './prompts/CreateSlidePrompt';
import CreateColorPalette from './colors/CreateColorPalette';

import './styles/slideViewerControls.css';

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
      </section>
      <section className="controls_ai">
        <CreateSlidePrompt slideshowId={slideshowId} slideId={slideId} />
        <CreateColorPalette slideshowId={slideshowId} />
      </section>
    </div>
  );
}
