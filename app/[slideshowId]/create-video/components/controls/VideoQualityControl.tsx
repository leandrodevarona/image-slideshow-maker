import React from 'react';
import DefineQuality from './buttons/DefineQuality';
import { VideoQuality } from '@ism/app/[slideshowId]/lib/hooks/useCreateSlideshowVideo';

import './styles/videoQualityControl.css';

export default function VideoQualityControl() {
  return (
    <div className="video_quality__control">
      <DefineQuality quality={VideoQuality.FHD} />
      <DefineQuality quality={VideoQuality.HD} />
      <DefineQuality quality={VideoQuality.SD} />
    </div>
  );
}
