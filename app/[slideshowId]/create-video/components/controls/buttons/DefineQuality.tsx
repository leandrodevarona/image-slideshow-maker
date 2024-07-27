'use client';

import { Suspense } from 'react';
import { VideoQuality } from '@ism/app/[slideshowId]/lib/hooks/useCreateSlideshowVideo';
import useVideoQuality from '@ism/app/[slideshowId]/lib/hooks/useVideoQuality';
import clsx from 'clsx';

import './styles/defineQuality.css';

type Props = {
  quality: VideoQuality;
};

function Component({ quality }: Props) {
  const { isPending, quality: currentQuality, setQuality } = useVideoQuality();

  const handleOnClick = () => {
    setQuality(quality);
  };

  return (
    <button
      className={clsx(
        'define_quality__button',
        'primary_button',
        'centered_button',
        quality === currentQuality && 'is_current'
      )}
      disabled={isPending}
      onClick={handleOnClick}
    >
      {quality}
    </button>
  );
}

export default function DefineQuality(props: Props) {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
}
