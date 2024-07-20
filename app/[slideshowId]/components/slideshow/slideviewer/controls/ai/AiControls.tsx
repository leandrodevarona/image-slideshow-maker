import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import CreateSlidePrompt from './prompts/CreateSlidePrompt';
import CreateColorPalette from './colors/CreateColorPalette';

import './styles/aiControls.css';
import { MagicWandIcon } from '@radix-ui/react-icons';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function AiControls({ slideshowId, slideId }: Props) {
  return (
    <DropdownMenu
      id="ai_controls"
      className="ai_controls"
      buttonClassName="ai_controls__button primary_button"
      buttonContent={'AI'}
      contentClassName="ai_controls__content"
    >
      <div className="ai_controls__container">
        <CreateSlidePrompt slideshowId={slideshowId} slideId={slideId} />
        <CreateColorPalette slideshowId={slideshowId} />
      </div>
    </DropdownMenu>
  );
}
