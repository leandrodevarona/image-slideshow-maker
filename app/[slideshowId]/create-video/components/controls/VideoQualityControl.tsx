import React from "react";
import DefineQuality from "./buttons/DefineQuality";
import { VideoQuality } from "@ism/app/[slideshowId]/lib/hooks/useCreateSlideshowVideo";

import "./styles/videoQualityControl.css";

export default function VideoQualityControl() {
  const keys = Object.values(VideoQuality);

  return (
    <div className="video_quality__control">
      {keys.map((quality) => (
        <DefineQuality key={quality} quality={quality} />
      ))}
    </div>
  );
}
