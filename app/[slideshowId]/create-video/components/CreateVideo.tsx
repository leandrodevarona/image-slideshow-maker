'use client';

import useCreateSlideshowVideo from '../../lib/hooks/useCreateSlideshowVideo';
import { SlideshowWithSlides } from '../../lib/types/slideshow';

import './styles/createVideo.css';

type Props = {
  slideshow: SlideshowWithSlides;
};

export default function CreateVideo({ slideshow }: Props) {
  const { isLoadingLib, progress, createVideo } =
    useCreateSlideshowVideo(slideshow);

  return (
    <div className="create_video">
      <div className="create_video__progress" hidden={progress <= 0}>
        Progress: {progress} %
      </div>
      <button
        className="primary_button centered_button"
        disabled={isLoadingLib || progress > 0}
        onClick={createVideo}
      >
        Start creating the video
      </button>
    </div>
  );
}
