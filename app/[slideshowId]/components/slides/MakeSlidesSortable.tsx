'use client';

import MakeSortable from '@ism/app/components/common/sortable/MakeSortable';
import { useTransition } from 'react';
import Sortable from 'sortablejs';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  slideshowId: string;
  changeIndexAction: (
    slideshowId: string,
    slideId: string,
    newIndex: number
  ) => Promise<undefined>;
};

export default function MakeSlidesSortable({
  slideshowId,
  changeIndexAction,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleOnChange = useDebouncedCallback((evt: Sortable.SortableEvent) => {
    startTransition(() => {
      const slideId = evt.item.id;
      const newIndex = evt.newIndex;
      if (newIndex && newIndex >= 0)
        changeIndexAction(slideshowId, slideId, newIndex);
    });
  }, 1000);

  return <MakeSortable elemId={slideshowId} onChange={handleOnChange} />;
}
