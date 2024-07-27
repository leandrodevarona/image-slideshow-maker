'use client';

import useCreateSlideshowVideo from '../../lib/hooks/useCreateSlideshowVideo';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import CreateVideoLoader from './loaders/CreateVideoLoader';

import './styles/createVideo.css';

type Props = {
  slideshow: SlideshowWithSlides;
};

export default function CreateVideo({ slideshow }: Props) {
  const { isLoading, createVideo } = useCreateSlideshowVideo(slideshow);

  return (
    <div className="create_video">
      {isLoading ? (
        <>
          <h4>
            Creating the video file <q>{slideshow.name}.mp4</q>
          </h4>
          <h5>
            Please do not close or reload the page while the video is being
            created
          </h5>
          <CreateVideoLoader />
        </>
      ) : (
        <h4>Press the button below to start creating your video.</h4>
      )}
      <button
        className="primary_button centered_button"
        disabled={isLoading}
        onClick={createVideo}
      >
        Start creating the video
      </button>
    </div>
  );
}
