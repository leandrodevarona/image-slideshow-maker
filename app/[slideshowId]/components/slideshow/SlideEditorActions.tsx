import { Suspense } from 'react';
import DeleteSlideItems from './buttons/DeleteSlideItems';
import SaveChanges from './buttons/SaveChanges';

import './styles/slideEditorActions.css';

type Props = {
  slideshowId: string;
};

export default function SlideEditorActions({ slideshowId }: Props) {
  return (
    <div className="slide_editor__actions">
      <Suspense>
        <DeleteSlideItems />
      </Suspense>
      <SaveChanges slideshowId={slideshowId} />
    </div>
  );
}
