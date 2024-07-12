import Submit from '@ism/app/components/common/buttons/Submit';
import PhotoList from '../PhotoList';
import { createAction } from '@ism/app/[slideshowId]/lib/actions/slide';

import './styles/photoPickerForm.css';

type Props = {
  slideshowId: string;
  query?: string;
};

export default function PhotoPickerForm({ slideshowId, query }: Props) {
  const createSlide = createAction.bind(null, slideshowId);

  return (
    <form className="photo_picker__form" action={createSlide}>
      <PhotoList query={query} />
      <Submit className="primary_button">Create slide</Submit>
    </form>
  );
}
