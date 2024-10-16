"use client";

import BarLoader from "@ism/app/components/common/loaders/BarLoader";
import useCreateSlideshowVideo, {
  VideoQuality,
  VideoQualityMobile,
} from "../../lib/hooks/useCreateSlideshowVideo";
import { SlideshowWithSlides } from "../../lib/types/slideshow";
import VideoQualityControl from "./controls/VideoQualityControl";
import clsx from "clsx";

import "./styles/createVideo.css";

type Props = {
  slideshow: SlideshowWithSlides;
  quality?: VideoQuality | VideoQualityMobile;
  mobile?: boolean;
};

export default function CreateVideo({ slideshow, quality, mobile }: Props) {
  const { isLoading, createVideo } = useCreateSlideshowVideo(
    slideshow,
    quality,
    mobile
  );

  return (
    <div className="create_video">
      {isLoading ? (
        <>
          <h1>
            Creating the video file <q>{slideshow.name}.mp4</q>
          </h1>
          <h2>
            Please, do not close or reload the page while the video is being
            created
          </h2>
          <BarLoader />
        </>
      ) : (
        <>
          <h1>
            Select the quality and press the button below to start creating your
            video.
          </h1>
          <VideoQualityControl mobile={mobile} />
        </>
      )}
      <button
        className={clsx(
          "create_video__button",
          "primary_button",
          "centered_button"
        )}
        disabled={isLoading}
        onClick={createVideo}
      >
        Start creating the video
      </button>
    </div>
  );
}
