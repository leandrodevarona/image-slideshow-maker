'use client';

import MakeSortable from '@ism/app/components/common/sortable/MakeSortable';
import Sortable from 'sortablejs';

type Props = {
  slideListId: string;
};

export default function MakeSlidesSortable({ slideListId }: Props) {
  const handleOnChange = (evt: Sortable.SortableEvent) => {
    const slideId = evt.item.id;
    const newIndex = evt.newIndex;

    console.log(slideId, newIndex);
  };

  return <MakeSortable elemId={slideListId} onChange={handleOnChange} />;
}
