import { createAction } from '@ism/app/[slideshowId]/lib/actions/colors';
import Submit from '@ism/app/components/common/buttons/Submit';

import './styles/createColorPalette.css';

type Props = {
  slideshowId: string;
};

export default function CreateColorPalette({ slideshowId }: Props) {
  const createColors = createAction.bind(null, slideshowId, 'love');

  return (
    <form className='create_color__palette' action={createColors}>
      <Submit className="primary_button">Colors AI</Submit>
    </form>
  );
}
