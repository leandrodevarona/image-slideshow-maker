import Submit from '@ism/app/components/common/buttons/Submit';
import PhotoList from '../PhotoList';
import { createAction } from '@ism/app/[slideshowId]/lib/actions/slides';
import { Suspense } from 'react';

import './styles/photoPickerForm.css';

type Props = {
  slideshowId: string;
  query?: string;
};

function Component({ slideshowId, query }: Props) {
  const createSlide = createAction.bind(null, slideshowId);

  return (
    <form className="photo_picker__form" action={createSlide}>
      <PhotoList query={query} />
      <Submit className="primary_button">Create slide</Submit>
    </form>
  );
}

export default function PhotoPickerForm(props: Props) {
  return (
    <Suspense fallback={'Loading photos...'}>
      <Component {...props} />
    </Suspense>
  );
}
