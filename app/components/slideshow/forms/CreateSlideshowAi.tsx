import { autoCreateAction } from "@ism/app/lib/actions/slideshow";
import Submit from "../../common/buttons/Submit";
import DotsLoader from "../../common/loaders/DotsLoader";

import "./styles/createSlideshowAi.css";

export default function CreateSlideshowAi() {
  return (
    <form className="create_slideshow__ai" action={autoCreateAction}>
      <input
        type="text"
        name="theme"
        placeholder="Type a theme..."
        required
        maxLength={20}
      />
      <Submit className="primary_button" pendingNode={<DotsLoader />}>
        Create slideshow using AI
      </Submit>
    </form>
  );
}
