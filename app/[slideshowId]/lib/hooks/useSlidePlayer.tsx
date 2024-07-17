'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSeeSlide from './useSeeSlide';
import { useTransition } from 'react';

export default function useSlidePlayer(slidesLength: number = 0) {
  const PLAY_PAUSE_QUERY = 'pause';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { currentIndex, seeSlide } = useSeeSlide();

  const playPause = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isPause = params.get(PLAY_PAUSE_QUERY) === 'true';

      if (isPause) {
        params.delete(PLAY_PAUSE_QUERY);
      } else {
        params.set(PLAY_PAUSE_QUERY, 'true');
      }

      replace(`${pathname}?${params.toString()}`);
    });
  };

  const next = () => {
    const newIndex = currentIndex + 1;

    if (newIndex < slidesLength) seeSlide(newIndex);
  };

  return { isPending, currentIndex, playPause, next };
}
