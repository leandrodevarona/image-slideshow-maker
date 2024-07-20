import { createAction } from '@ism/app/[slideshowId]/lib/actions/colors';
import Submit from '@ism/app/components/common/buttons/Submit';
import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import { CheckIcon } from '@radix-ui/react-icons';

import './styles/createColorPalette.css';

type Props = {
  slideshowId: string;
};

export default function CreateColorPalette({ slideshowId }: Props) {
  const createColors = createAction.bind(null, slideshowId);

  return (
    <DropdownMenu
      id="color_palette"
      className="create_color__palette"
      buttonClassName="color_palette__button primary_button"
      buttonContent={'Colors'}
      contentClassName="color_palette__content"
      title="Generate slideshow color palette"
    >
      <form className="color_palette__form" action={createColors}>
        <input
          type="text"
          name="colors_theme"
          placeholder="Type a theme..."
          required
          max={10}
          min={3}
        />
        <Submit className="primary_button">
          <CheckIcon />
        </Submit>
      </form>
    </DropdownMenu>
  );
}
