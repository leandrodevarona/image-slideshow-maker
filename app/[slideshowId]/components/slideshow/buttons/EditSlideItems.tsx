'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { Cross1Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import './styles/editSlideItems.css';

export default function EditSlideItems() {
  const queryName = 'editItems';

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const isEditing = Boolean(searchParams.get(queryName)) === true;

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    const params = new URLSearchParams(searchParams);

    const isEditing = Boolean(params.get(queryName)) === true;

    if (isEditing) params.delete(queryName);
    else params.set(queryName, 'true');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className="edit_slide__items primary_button"
      aria-label="Edit slides button"
      title={isEditing ? 'Cancel edit slides' : 'Edit slides'}
      onClick={handleOnClick}
    >
      {isEditing ? <Cross1Icon /> : <Pencil1Icon />}
    </button>
  );
}
