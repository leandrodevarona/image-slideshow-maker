import { Suspense } from 'react';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlidePlayer from './player/SlidePlayer';
import SlideEditorControls from './SlideEditorControls';
import SlideViewer from './slideviewer/SlideViewer';

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

  return (
    <div className="slide_editor">
      <section className="slide_editor__viewer">
        <SlideViewer slideshowId={slideshow.id} slide={currentSlide} />
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
          <SlidePlayer
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
