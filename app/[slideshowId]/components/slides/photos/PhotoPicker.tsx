import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import { ImageIcon } from '@radix-ui/react-icons';
import SearchPhotos from './inputs/SearchPhotos';
import PhotoPickerForm from './forms/PhotoPickerForm';

import './styles/photoPicker.css';

type Props = {
  slideshowId: string;
  query?: string;
};

export default function PhotoPicker({ slideshowId, query }: Props) {
  return (
    <DropdownMenu
      id="photo_picker"
      buttonClassName="photo_picker__button primary_button"
      buttonContent={
        <>
          <ImageIcon />
          <span>Add Slide</span>
        </>
      }
      contentClassName="photo_picker__content"
    >
      <div className="photo_picker__container">
        <header className="photo_picker__header">
          <h4>Photo Search</h4>
          <p>Search Unsplash for photos</p>
        </header>
        <section>
          <SearchPhotos />
        </section>
        <section>
          <PhotoPickerForm slideshowId={slideshowId} query={query} />
        </section>
      </div>
    </DropdownMenu>
  );
}
