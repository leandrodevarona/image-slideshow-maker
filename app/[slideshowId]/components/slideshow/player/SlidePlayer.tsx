'use client';

import useElapsedTime from '@ism/app/[slideshowId]/lib/hooks/useElapsedTime';
import useSlidePlayer from '@ism/app/[slideshowId]/lib/hooks/useSlidePlayer';
import { useEffect } from 'react';

type Props = {
  slideDuration: number;
  pause?: boolean;
  slidesLength: number;
  onUpdateTime?: (elapsedTime: number) => void;
  onStopTime?: () => void;
};

export default function SlidePlayer({
  slideDuration,
  pause = false,
  slidesLength,
  onUpdateTime,
  onStopTime,
}: Props) {
  const { elapsedTime } = useElapsedTime();

  const { next: nextSlide } = useSlidePlayer(slidesLength);

  useEffect(() => {
    if (pause === true) return;

    if (elapsedTime <= slideDuration) {
      if (onUpdateTime) onUpdateTime(elapsedTime);
    } else {
      if (onStopTime) onStopTime();
      nextSlide();
    }

    return () => {
      if (onStopTime) {
        onStopTime();
      }
    };
  }, [elapsedTime, pause, slideDuration, nextSlide, onStopTime, onUpdateTime]);

  useEffect(() => {
    if (pause === true) {
      if (onStopTime) {
        onStopTime();
      }
    }
  }, [pause, onStopTime]);

  return null;
}
