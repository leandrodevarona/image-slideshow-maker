import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import DeleteColorPalette from './forms/DeleteColorPalette';
import CreateColorPalette from './forms/CreateColorPalette';

import './styles/colorPalette.css';

type Props = {
  slideshowId: string;
};

export default function ColorPalette({ slideshowId }: Props) {
  return (
    <DropdownMenu
      id="color_palette"
      className="color_palette"
      buttonClassName="color_palette__button primary_button"
      buttonContent={'Colors'}
      contentClassName="color_palette__content"
      title="Generate slideshow color palette with ai"
    >
      <div className="color_palette__container">
        <CreateColorPalette slideshowId={slideshowId} />
        <DeleteColorPalette slideshowId={slideshowId} />
      </div>
    </DropdownMenu>
  );
}
