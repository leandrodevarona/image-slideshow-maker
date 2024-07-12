import { SlideshowWithSlides } from '../../lib/types/slideshow';
import PhotoPicker from '../slides/photos/PhotoPicker';
import SlideController from '../slides/SlideController';

import './styles/slideEditor.css';

type Props = {
  slideshow: SlideshowWithSlides;
  photosQuery?: string;
};

export default function SlideEditor({ slideshow, photosQuery }: Props) {
  return (
    <div className="slide_editor">
      <section></section>
      <section className="slide_editor__controller">
        <SlideController slides={slideshow.slides} />
        <PhotoPicker slideshowId={slideshow.id} query={photosQuery} />
      </section>
    </div>
  );
}
