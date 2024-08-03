import { autoCreateAction } from '@ism/app/lib/actions/slideshow';
import Submit from '../../common/buttons/Submit';

import './styles/createSlideshowAi.css';
import DotsLoader from '../../common/loaders/DotsLoader';

export default function CreateSlideshowAi() {
  return (
    <form className="create_slideshow__ai" action={autoCreateAction}>
      <input
        type="text"
        name="theme"
        placeholder="Type a theme..."
        required
        max={10}
        min={3}
      />
      <Submit className="primary_button" pendingNode={<DotsLoader />}>
        Create slideshow using AI
      </Submit>
    </form>
  );
}
