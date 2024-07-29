import { createAction } from "@ism/app/lib/actions/slideshow";
import Submit from "../common/buttons/Submit";

import './styles/CreateSlideshow.css'

export default function CreateSlideshow() {
  return (
    <form className="create_slideshow" action={createAction}>
      <Submit className="primary_button">Create slideshow</Submit>
    </form>
  );
}
