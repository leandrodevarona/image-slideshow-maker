import Submit from '@ism/app/components/common/buttons/Submit';
import PhotoList from '../PhotoList';

import './styles/photoPickerForm.css';

type Props = {
  query?: string;
  createSlide: (formData: FormData) => Promise<undefined>;
};

export default function PhotoPickerForm({ query, createSlide }: Props) {
  return (
    <form className="photo_picker__form" action={createSlide}>
      <PhotoList query={query} />
      <Submit className="primary_button">Create slide</Submit>
    </form>
  );
}
