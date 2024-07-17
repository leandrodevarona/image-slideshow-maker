import { Suspense } from 'react';
import DeleteSlideItems from './buttons/DeleteSlideItems';
import SaveChanges from './buttons/SaveChanges';
import EditSlideItems from './buttons/EditSlideItems';

import './styles/SlideEditorControls.css';

type Props = {
  slideshowId: string;
};

export default function SlideEditorControls({ slideshowId }: Props) {
  return (
    <div className="slide_editor__actions">
      <Suspense>
        <DeleteSlideItems />
      </Suspense>
      <Suspense>
        <EditSlideItems />
      </Suspense>
      <SaveChanges slideshowId={slideshowId} />
    </div>
  );
}
