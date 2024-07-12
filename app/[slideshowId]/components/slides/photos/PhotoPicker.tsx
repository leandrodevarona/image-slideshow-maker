import DropdownMenu from '@ism/app/components/common/menus/DropdownMenu';
import { ImageIcon } from '@radix-ui/react-icons';
import SearchPhotos from './inputs/SearchPhotos';
import PhotoList from './PhotoList';
import Submit from '@ism/app/components/common/buttons/Submit';
import { createAction } from '@ism/app/[slideshowId]/lib/actions/slide';

import './styles/photoPicker.css';

type Props = {
  slideshowId: string;
  query?: string;
};

export default function PhotoPicker({ slideshowId, query }: Props) {
  const createSlide = createAction.bind(null, slideshowId);

  return (
    <DropdownMenu
      id="photo_picker"
      buttonClassName="photo_picker__button"
      buttonContent={
        <>
          <ImageIcon />
          <span>Add Slider</span>
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
          <form className="photo_picker__form" action={createSlide}>
            <PhotoList query={query} />
            <Submit className="primary_button">Create slide</Submit>
          </form>
        </section>
      </div>
    </DropdownMenu>
  );
}
