import { updateAction } from '@ism/app/[slideshowId]/lib/actions/slides';
import Submit from '@ism/app/components/common/buttons/Submit';
import { CheckIcon } from '@radix-ui/react-icons';

import './styles/editSlideItemDuration.css';

type Props = {
  slideshowId: string;
  slideId: string;
  slideDuration: number;
};

export default function EditSlideItemDuration({
  slideshowId,
  slideId,
  slideDuration,
}: Props) {
  const updateSlide = updateAction.bind(null, slideshowId, slideId);

  return (
    <form className="edit_slide__item" action={updateSlide}>
      <input
        type="number"
        name="duration"
        defaultValue={slideDuration}
        min={5}
        max={20}
        required
      />
      <Submit
        className="primary_button centered_button"
        ariaLabel="Edit slide duration"
        title="Edit slide duration"
      >
        <CheckIcon />
      </Submit>
    </form>
  );
}
