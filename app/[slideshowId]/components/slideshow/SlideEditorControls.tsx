import { DeleteSlideItems, EditSlideItems, SaveChanges } from './buttons';

import './styles/slideEditorControls.css';

type Props = {
  slideshowId: string;
};

export default function SlideEditorControls({ slideshowId }: Props) {
  return (
    <div className="slide_editor__controls">
      <DeleteSlideItems />
      <EditSlideItems />
      <SaveChanges slideshowId={slideshowId} />
    </div>
  );
}
