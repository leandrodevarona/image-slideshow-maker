'use client';

import { useEffect, useState } from 'react';
import useReorderSlides from '../../lib/hooks/useReorderSlides';

type Props = {
  slideshowId: string;
  slidesLength: number;
};

export default function AutoSaveChanges({ slideshowId, slidesLength }: Props) {
  const [length, setLength] = useState(0);

  const { reorder } = useReorderSlides(slideshowId);

  useEffect(() => {
    if (length !== slidesLength) {
      reorder();
      setLength(slidesLength);
    }
  }, [slidesLength, reorder, length]);

  return null;
}
