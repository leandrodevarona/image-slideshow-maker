'use client';

import MakeSortable from '@ism/app/components/common/sortable/MakeSortable';
import useSlideOrder from '../../lib/hooks/useSlideOrder';
import { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { saveChangesAction } from '../../lib/actions/slideshow';

type Props = {
  slideshowId: string;
};

export default function MakeSlidesSortable({ slideshowId }: Props) {
  const [, startTransition] = useTransition();
  const { getSlideOrder } = useSlideOrder(slideshowId);

  const handleOnChange = useDebouncedCallback(() => {
    startTransition(() => {
      const slideOrderIds = getSlideOrder();

      if (slideOrderIds) {
        saveChangesAction(slideshowId, slideOrderIds);
      }
    });
  }, 2000);

  return <MakeSortable elemId={slideshowId} onChange={handleOnChange} />;
}
