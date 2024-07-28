import clsx from 'clsx';
import { DeleteSlideItems, EditSlideItems, SaveChanges } from './buttons';

import './styles/slideEditorControls.css';

type Props = {
  className?: string;
  slideshowId: string;
};

export default function SlideEditorControls({ className, slideshowId }: Props) {
  return (
    <div className={clsx('slide_editor__controls', className)}>
      <DeleteSlideItems />
      <EditSlideItems />
      <SaveChanges slideshowId={slideshowId} />
    </div>
  );
}
