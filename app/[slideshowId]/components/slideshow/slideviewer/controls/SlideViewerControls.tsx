import CreateSlidePrompt from './prompts/CreateSlidePrompt';

import './styles/slideViewerControls.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function SlideViewerControls({ slideshowId, slideId }: Props) {
  return (
    <div className="slide_viewer__controls">
      <section></section>
      <section>
        <CreateSlidePrompt slideshowId={slideshowId} slideId={slideId} />
      </section>
    </div>
  );
}
