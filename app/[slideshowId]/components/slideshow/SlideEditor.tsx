import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlideEditorActions from './SlideEditorActions';
import SlideViewer from './SlideViewer';

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
    </div>
  );
}
