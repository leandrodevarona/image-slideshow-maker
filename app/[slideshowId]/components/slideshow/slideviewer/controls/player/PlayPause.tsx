'use client';

import useSlidePlayer from '@ism/app/[slideshowId]/lib/hooks/useSlidePlayer';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';

import './styles/playPause.css';

export default function PlayPause() {
  const { isPause, isPending, playPause } = useSlidePlayer();

  return (
    <button
      className="play_pause primary_button"
      disabled={isPending}
      onClick={playPause}
    >
      {isPause ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}
