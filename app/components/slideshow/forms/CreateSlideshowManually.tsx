import { createAction } from '@ism/app/lib/actions/slideshow';
import Submit from '../../common/buttons/Submit';

export default function CreateSlideshowManually() {
  return (
    <form action={createAction}>
      <Submit className="primary_button">Manually</Submit>
    </form>
  );
}
