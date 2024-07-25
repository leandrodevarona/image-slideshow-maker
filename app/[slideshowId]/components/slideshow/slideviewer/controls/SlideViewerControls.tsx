import PlayPause from './player/PlayPause';
import AiControls from './ai/AiControls';
import CurrentSlide from './player/CurrentSlide';

import './styles/slideViewerControls.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function SlideViewerControls({ slideshowId, slideId }: Props) {
  return (
    <div className="slide_viewer__controls">
      <section>
        <PlayPause />
        <CurrentSlide slideshowId={slideshowId} currentSlideId={slideId} />
      </section>
      <section className="controls_ai">
        <AiControls slideshowId={slideshowId} slideId={slideId} />
      </section>
    </div>
  );
}
