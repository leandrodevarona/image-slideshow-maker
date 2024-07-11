'use client';

import { useEffect } from 'react';
import Sortable from 'sortablejs';

type Props = {
  elemId: string;
  onChange?: (evt: Sortable.SortableEvent) => void;
};

export default function MakeSortable({ elemId, onChange }: Props) {
  useEffect(() => {
    const elem = document.getElementById(elemId);

    if (elem)
      new Sortable(elem, {
        animation: 150,
        ghostClass: 'blue-background-class',
        onChange,
      });
  }, [elemId, onChange]);

  return null;
}
