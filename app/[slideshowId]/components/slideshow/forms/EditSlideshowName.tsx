import { updateAction } from "@ism/app/[slideshowId]/lib/actions/slideshow";
import Submit from "@ism/app/components/common/buttons/Submit";
import { CheckIcon } from "@radix-ui/react-icons";

import "./styles/editSlideshowName.css";

type Props = {
  slideshowId: string;
  slideshowName: string;
};

export default function EditSlideshowName({
  slideshowId,
  slideshowName,
}: Props) {
  const updateSlideshow = updateAction.bind(null, slideshowId);

  return (
    <form className="edit_slideshow__name" action={updateSlideshow}>
      <input
        type="text"
        defaultValue={slideshowName}
        name="name"
        placeholder="Slideshow name"
        required
        role="textbox"
      />
      <Submit
        className="primary_button centered_button"
        ariaLabel="Edit slideshow name"
        title="Edit slideshow name"
      >
        <CheckIcon />
      </Submit>
    </form>
  );
}
