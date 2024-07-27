'use client';

import useCreateSlideshowVideo, {
  VideoQuality,
} from '../../lib/hooks/useCreateSlideshowVideo';
import { SlideshowWithSlides } from '../../lib/types/slideshow';
import VideoQualityControl from './controls/VideoQualityControl';
import CreateVideoLoader from './loaders/CreateVideoLoader';

import './styles/createVideo.css';

type Props = {
  slideshow: SlideshowWithSlides;
  quality?: VideoQuality;
};

export default function CreateVideo({ slideshow, quality }: Props) {
  const { isLoading, createVideo } = useCreateSlideshowVideo(
    slideshow,
    quality
  );

  return (
    <div className="create_video">
      {isLoading ? (
        <>
          <h4>
            Creating the video file <q>{slideshow.name}.mp4</q>
          </h4>
          <h5>
            Please, do not close or reload the page while the video is being
            created
          </h5>
          <CreateVideoLoader />
        </>
      ) : (
        <>
          <h4>
            Select the quality and press the button below to start creating your
            video.
          </h4>
          <VideoQualityControl />
        </>
      )}
      <button
        className="create_video__button primary_button centered_button"
        disabled={isLoading}
        onClick={createVideo}
      >
        Start creating the video
      </button>
    </div>
  );
}
