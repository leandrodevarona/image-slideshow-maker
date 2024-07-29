'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { VideoQuality } from './useCreateSlideshowVideo';

export default function useVideoQuality() {
  const qualityQueryName = 'quality';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const quality = searchParams.get(qualityQueryName);

  const setQuality = (quality: VideoQuality) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.set(qualityQueryName, quality);

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return { isPending, quality, setQuality };
}
