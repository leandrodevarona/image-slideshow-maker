'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { MouseEvent } from 'react';

import './styles/deleteSlideItems.css';

export default function DeleteSlideItems() {
  const deleteQueryName = 'deleteItems';
  const editQueryName = 'editItems';

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const isDeleting = Boolean(searchParams.get(deleteQueryName)) === true;

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    const params = new URLSearchParams(searchParams);

    const isDeleting = Boolean(params.get(deleteQueryName)) === true;

    const isEditing = Boolean(params.get(editQueryName)) === true;

    if (!isEditing) {
      if (isDeleting) params.delete(deleteQueryName);
      else params.set(deleteQueryName, 'true');

      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <button
      className="delete_slide__items primary_button"
      aria-label="Delete slides button"
      title={isDeleting ? 'Cancel delete slides' : 'Delete slides'}
      onClick={handleOnClick}
    >
      {isDeleting ? <Cross2Icon /> : <TrashIcon />}
    </button>
  );
}
