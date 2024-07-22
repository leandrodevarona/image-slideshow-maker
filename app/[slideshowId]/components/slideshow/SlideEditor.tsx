import { Suspense } from 'react';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlideEditorControls from './SlideEditorControls';
import SlideViewer from './slideviewer/SlideViewer';
import SlideViewerControls from './slideviewer/controls/SlideViewerControls';
import SlidePrompt from '../slides/prompts/SlidePrompt';
import SlidePlayerPainter from './player/SlidePlayerPainter';
import { updateAction } from '../../lib/actions/slides';

import './styles/slideEditor.css';

type Props = {
  slideshow: SlideshowWithSlides;
  slideIndex?: number;
  photosQuery?: string;
  editItems?: boolean;
  deleteItem?: boolean;
  pause?: boolean;
};

export default function SlideEditor({
  slideshow,
  slideIndex = 0,
  photosQuery,
  editItems = false,
  deleteItem = false,
  pause = false,
}: Props) {
  const currentSlide = slideshow.slides.find(
    (slide) => slide.index === slideIndex
  );

  const imgId = 'slide_viewer__img' + currentSlide?.id;
  const slideId = currentSlide?.id || '';

  const slidePlayerKey = 'slide-player-' + currentSlide?.id;
  const slidePromptKey = 'prompt' + slideId;

  const updateAlt = updateAction.bind(null, slideshow.id, slideId);

  return (
    <div className="slide_editor">
      <section className="slide_editor__viewer-container">
        <SlideViewer
          className="slide_editor__viewer"
          imgElemId={imgId}
          slide={currentSlide}
        >
          {currentSlide && (
            <>
              <SlidePrompt
                key={slidePromptKey}
                updateAlt={updateAlt}
                slideAlt={currentSlide.alt}
                imgElemId={imgId}
              />
              <SlideViewerControls
                slideshowId={slideshow.id}
                slideId={currentSlide.id}
              />
            </>
          )}
        </SlideViewer>
      </section>
      <section className="slide_editor__controller">
        <SlideEditorControls slideshowId={slideshow.id} />
        <SlideController
          slideshowId={slideshow.id}
          slides={slideshow.slides}
          currentSlideId={currentSlide?.id}
          editing={editItems}
          deleting={deleteItem}
        />
        <PhotoPicker slideshowId={slideshow.id} query={photosQuery} />
      </section>
      {currentSlide && (
        <Suspense>
          <SlidePlayerPainter
            key={slidePlayerKey}
            slideId={currentSlide.id}
            slideDuration={currentSlide?.duration}
            slidesLength={slideshow.slides.length}
            imgElemId={imgId}
            pause={pause}
          />
        </Suspense>
      )}
    </div>
  );
}
