import { Suspense } from 'react';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlidePlayer from './player/SlidePlayer';
import SlideEditorActions from './SlideEditorActions';
import SlideViewer from './slideviewer/SlideViewer';

import './styles/slideEditor.css';

type Props = {
  slideshow: SlideshowWithSlides;
  slideIndex?: number;
  photosQuery?: string;
  editItems?: boolean;
  deleteItem?: boolean;
};

export default function SlideEditor({
  slideshow,
  slideIndex = 0,
  photosQuery,
  editItems = false,
  deleteItem = false,
}: Props) {
  const currentSlide = slideshow.slides.find(
    (slide) => slide.index === slideIndex
  );

  return (
    <div className="slide_editor">
      <section>
        <SlideViewer slideshowId={slideshow.id} slide={currentSlide} />
      </section>
      <section className="slide_editor__controller">
        <SlideEditorActions slideshowId={slideshow.id} />
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
            key={'slide-player-' + currentSlide.id}
            slideId={currentSlide.id}
            slideDuration={currentSlide?.duration}
            slidesLength={slideshow.slides.length}
          />
        </Suspense>
      )}
    </div>
  );
}
