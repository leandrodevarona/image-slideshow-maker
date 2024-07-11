'use client';

import { useEffect } from 'react';
import Sortable from 'sortablejs';

type Props = {
  elemId: string;
};

export default function MakeSortable({ elemId }: Props) {
  useEffect(() => {
    const elem = document.getElementById(elemId);

    if (elem)
      new Sortable(elem, {
        animation: 150,
        ghostClass: 'blue-background-class',
      });
  }, [elemId]);

  return null;
}
