import { updateAction } from '@ism/app/[slideshowId]/lib/actions/slides';
import Submit from '@ism/app/components/common/buttons/Submit';
import { CheckIcon } from '@radix-ui/react-icons';

type Props = {
  slideshowId: string;
  slideId: string;
  slideDuration: number;
};

export default function EditSlideItem({
  slideshowId,
  slideId,
  slideDuration,
}: Props) {
  const updateSlide = updateAction.bind(null, slideshowId, slideId);

  return (
    <form className="slide_item__to-edit" action={updateSlide}>
      <input
        type="number"
        name="duration"
        defaultValue={slideDuration}
        min={5}
        max={20}
        required
      />
      <Submit
        className="primary_button"
        ariaLabel="Edit slide duration"
        title="Edit slide duration"
      >
        <CheckIcon />
      </Submit>
    </form>
  );
}
