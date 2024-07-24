'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function useSeeSlide() {
  const INDEX_QUERY_NAME = 'slideIndex';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentIndex = parseInt(searchParams.get(INDEX_QUERY_NAME) || '') || 0;

  const seeSlide = (index: number) => {
    startTransition(() => {
      const queryParams = new URLSearchParams(searchParams);
      const currentIndex = parseInt(queryParams.get(INDEX_QUERY_NAME) || '');

      if (currentIndex !== index) {
        queryParams.set(INDEX_QUERY_NAME, String(index));
        replace(`${pathname}?${queryParams.toString()}`);
      }
    });
  };

  return { isPending, currentIndex, seeSlide };
}
