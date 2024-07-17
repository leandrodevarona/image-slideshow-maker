'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSeeSlide from './useSeeSlide';
import { useTransition } from 'react';

export default function useSlidePlayer(slidesLength: number) {
  const PLAY_PAUSE_QUERY = 'pause';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { currentIndex, seeSlide } = useSeeSlide();

  const play = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.set(PLAY_PAUSE_QUERY, 'true');

      replace(`${pathname}?${params.toString()}`);
    });
  };

  const pause = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.delete(PLAY_PAUSE_QUERY);

      replace(`${pathname}?${params.toString()}`);
    });
  };

  const next = () => {
    const newIndex = currentIndex + 1;

    if (newIndex < slidesLength) seeSlide(newIndex);
  };

  return { isPending, currentIndex, play, pause, next };
}
