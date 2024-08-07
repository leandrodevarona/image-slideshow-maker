import { getPhotos } from "@ism/app/[slideshowId]/lib/data/photos";
import PhotoItem from "./PhotoItem";

import "./styles/photoList.css";

type Props = {
  query?: string;
};

function NoResults() {
  return <div>No results</div>;
}

export default async function PhotoList({ query }: Props) {
  const photos = await getPhotos(query);

  if (!photos || photos.length <= 0) return <NoResults />;

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
