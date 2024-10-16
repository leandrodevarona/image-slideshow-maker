import React from "react";
import DefineQuality from "./buttons/DefineQuality";
import {
  VideoQuality,
  VideoQualityMobile,
} from "@ism/app/[slideshowId]/lib/hooks/useCreateSlideshowVideo";

import "./styles/videoQualityControl.css";

type Props = {
  mobile?: boolean;
};

export default function VideoQualityControl({ mobile = false }: Props) {
  const qualities = mobile ? VideoQualityMobile : VideoQuality;

  const keys = Object.values(qualities);

  return (
    <div className="video_quality__control">
      {keys.map((quality) => (
        <DefineQuality key={quality} quality={quality} />
      ))}
    </div>
  );
}
