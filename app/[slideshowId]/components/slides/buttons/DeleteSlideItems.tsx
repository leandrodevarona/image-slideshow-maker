'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';
import { MouseEvent } from 'react';

import './styles/deleteSlideItems.css';

export default function DeleteSlideItems() {
  const queryName = 'deleteItems';

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    const params = new URLSearchParams(searchParams);

    const isDeleting = Boolean(params.get(queryName)) === true;

    if (isDeleting) params.delete(queryName);
    else params.set(queryName, 'true');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="delete_slide__items">
      <button className="primary_button" onClick={handleOnClick}>
        <TrashIcon />
      </button>
    </div>
  );
}
