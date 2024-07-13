'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { MouseEvent } from 'react';

import './styles/deleteSlideItems.css';

export default function DeleteSlideItems() {
  const queryName = 'deleteItems';

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const isDeleting = Boolean(searchParams.get(queryName)) === true;

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
      <button
        className="primary_button"
        aria-label="Delete slides button"
        title={isDeleting ? 'Cancel delete slides' : 'Delete slides'}
        onClick={handleOnClick}
      >
        {isDeleting ? <Cross2Icon /> : <TrashIcon />}
      </button>
    </div>
  );
}
