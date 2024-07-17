import { Suspense } from 'react';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlideEditorControls from './SlideEditorControls';
import SlideViewer from './slideviewer/SlideViewer';
import SlideViewerControls from './slideviewer/controls/SlideViewerControls';
import SlidePrompt from '../slides/prompts/SlidePrompt';
import SlidePlayerPainter from './player/SlidePlayerPainter';

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

  const slidePlayerKey = 'slide-player-' + currentSlide?.id + String(pause);

  const imgId = 'slide_viewer__img' + currentSlide?.id;

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
                slideshowId={slideshow.id}
                slide={currentSlide}
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
            pause={pause}
          />
        </Suspense>
      )}
    </div>
  );
}
