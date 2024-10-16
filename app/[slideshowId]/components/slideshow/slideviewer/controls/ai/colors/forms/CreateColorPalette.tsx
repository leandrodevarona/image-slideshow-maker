import { createAction } from "@ism/app/[slideshowId]/lib/actions/colors";
import Submit from "@ism/app/components/common/buttons/Submit";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import "./styles/createColorPalette.css";

type Props = {
  slideshowId: string;
};

export default function CreateColorPalette({ slideshowId }: Props) {
  const createColors = createAction.bind(null, slideshowId);

  return (
    <form className="create_color__palette" action={createColors}>
      <input
        type="text"
        name="colors_theme"
        placeholder="Type a theme..."
        required
        maxLength={20}
      />
      <Submit className={clsx("primary_button", "centered_button")}>
        <CheckIcon />
      </Submit>
    </form>
  );
}
