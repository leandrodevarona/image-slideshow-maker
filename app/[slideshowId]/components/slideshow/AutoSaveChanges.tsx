'use client';

import { useEffect, useState } from 'react';
import useSaveChanges from '../../lib/hooks/useSaveChanges';

type Props = {
  slideshowId: string;
  slidesLength: number;
};

export default function AutoSaveChanges({ slideshowId, slidesLength }: Props) {
  const [length, setLength] = useState(0);

  const { saveChanges } = useSaveChanges(slideshowId);

  useEffect(() => {
    if (length !== slidesLength) {
      saveChanges();
      setLength(slidesLength);
    }
  }, [slidesLength, saveChanges, length]);

  return null;
}
