import { SlideshowWithSlides } from '../../lib/types/slideshow';
import DeleteSlideItems from './buttons/DeleteSlideItems';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';
import SlideEditorActions from './SlideEditorActions';

import './styles/slideEditor.css';

type Props = {
  slideshow: SlideshowWithSlides;
  photosQuery?: string;
  deleteItem?: boolean;
};

export default function SlideEditor({
  slideshow,
  photosQuery,
  deleteItem = false,
}: Props) {
  return (
    <div className="slide_editor">
      <section></section>
      <section className="slide_editor__controller">
        <SlideEditorActions slideshowId={slideshow.id} />
        <SlideController
          slideshowId={slideshow.id}
          slides={slideshow.slides}
          deleting={deleteItem}
        />
        <PhotoPicker slideshowId={slideshow.id} query={photosQuery} />
      </section>
    </div>
  );
}
