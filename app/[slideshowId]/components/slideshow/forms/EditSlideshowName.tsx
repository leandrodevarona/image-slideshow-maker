import { updateAction } from '@ism/app/[slideshowId]/lib/actions/slideshow';

import './styles/editSlideshowName.css';

type Props = {
  slideshowId: string;
  slideshowName: string;
};

export default function EditSlideshowName({ slideshowId, slideshowName }: Props) {
  const updateSlideshow = updateAction.bind(null, slideshowId);

  return (
    <form className="edit_slideshow" action={updateSlideshow}>
      <input
        type="text"
        defaultValue={slideshowName}
        name="name"
        placeholder="Slideshow name"
        required
        role="textbox"
      />
    </form>
  );
}
