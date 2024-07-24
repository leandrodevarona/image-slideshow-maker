import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import CreateSlidePrompt from './prompts/CreateSlidePrompt';
import ColorPalette from './colors/ColorPalette';

import './styles/aiControls.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function AiControls({ slideshowId, slideId }: Props) {
  return (
    <DropdownMenu
      id="ai_controls"
      className="ai_controls"
      buttonClassName="ai_controls__button primary_button centered_button"
      buttonContent={'AI'}
      contentClassName="ai_controls__content"
      title="Ai options"
    >
      <div className="ai_controls__container">
        <CreateSlidePrompt slideshowId={slideshowId} slideId={slideId} />
        <ColorPalette slideshowId={slideshowId} />
      </div>
    </DropdownMenu>
  );
}
