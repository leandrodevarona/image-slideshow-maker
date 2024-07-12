import Image from 'next/image';

import './styles/photoItem.css';

type Props = {
  photoId: string;
  photoSmallUrl: string;
};

export default function PhotoItem({ photoId, photoSmallUrl }: Props) {
  return (
    <li className="photo_item">
      <label>
        <input
          type="radio"
          name="photo"
          defaultValue={photoId}
          defaultChecked={false}
          hidden
          required
        />
        <Image src={photoSmallUrl} alt="Slide photo" width={60} height={60} />
      </label>
    </li>
  );
}
