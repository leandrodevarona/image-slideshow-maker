'use client';

import useElapsedTime from '@ism/app/[slideshowId]/lib/hooks/useElapsedTime';
import useSlidePlayer from '@ism/app/[slideshowId]/lib/hooks/useSlidePlayer';
import { useEffect } from 'react';

type Props = {
  slideDuration: number;
  pause?: boolean;
  slidesLength: number;
  imgElemId: string;
  onUpdateTime?: (elapsedTime: number) => void;
  onStopTime?: () => void;
};

export default function SlidePlayer({
  slideDuration,
  pause = false,
  slidesLength,
  imgElemId,
  onUpdateTime,
  onStopTime,
}: Props) {
  const { elapsedTime, setElapsedTime } = useElapsedTime(0, pause);

  const { next: nextSlide } = useSlidePlayer(slidesLength);

  useEffect(() => {
    if (pause === true) return;

    const imgElem = document.getElementById(imgElemId) as HTMLImageElement;

    const handleImageLoad = () => {
      if (elapsedTime <= slideDuration) {
        if (onUpdateTime) onUpdateTime(elapsedTime);
      } else {
        if (onStopTime) onStopTime();
        nextSlide();
      }
    };

    if (imgElem) {
      if (imgElem.complete) {
        handleImageLoad();
      } else {
        setElapsedTime(0);
        imgElem.addEventListener('load', handleImageLoad);
      }
    }

    return () => {
      if (imgElem) {
        imgElem.removeEventListener('load', handleImageLoad);
      }

      if (onStopTime) {
        onStopTime();
      }
    };
  }, [
    elapsedTime,
    pause,
    slideDuration,
    imgElemId,
    nextSlide,
    onStopTime,
    onUpdateTime,
    setElapsedTime,
  ]);

  useEffect(() => {
    if (pause === true) {
      if (onStopTime) {
        onStopTime();
      }
    }
  }, [pause, onStopTime]);

  return null;
}
