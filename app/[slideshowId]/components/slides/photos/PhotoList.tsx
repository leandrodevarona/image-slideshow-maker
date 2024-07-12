import { getPhotos } from '@ism/app/[slideshowId]/lib/data/photos';
import PhotoItem from './PhotoItem';

import './styles/photoList.css';

type Props = {
  query?: string;
};

export default async function PhotoList({ query }: Props) {
  const photos = await getPhotos(query);

  if (!photos) return null;
  if (photos.length <= 0) return null;

  return (
    <ul className="photo_list">
      {photos.map((photo) => (
        <PhotoItem
          key={photo.id}
          photoId={photo.id}
          photoSmallUrl={photo.urls.small}
        />
      ))}
    </ul>
  );
}
