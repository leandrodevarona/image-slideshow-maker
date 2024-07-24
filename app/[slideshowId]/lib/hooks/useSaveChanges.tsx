'use client';

import { useCallback, useTransition } from 'react';
import useSlideOrder from './useSlideOrder';
import { saveChangesAction } from '../actions/slideshow';

export default function useSaveChanges(slideshowId: string) {
  const [isPending, startTransition] = useTransition();

  const { getSlideOrder } = useSlideOrder(slideshowId);

  const handleOnSave = useCallback(() => {
    startTransition(() => {
      const slideOrderIds = getSlideOrder();

      if (slideOrderIds) {
        saveChangesAction(slideshowId, slideOrderIds);
      }
    });
  }, [slideshowId, getSlideOrder]);

  return { isPending, saveChanges: handleOnSave };
}
