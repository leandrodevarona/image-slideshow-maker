'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';

import './styles/editSlideItems.css';

export default function EditSlideItems() {
  const editQueryName = 'editItems';
  const deleteQueryName = 'deleteItems';

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const isEditing = Boolean(searchParams.get(editQueryName)) === true;

  const handleOnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    const params = new URLSearchParams(searchParams);

    const isEditing = Boolean(params.get(editQueryName)) === true;

    const isDeleting = Boolean(params.get(deleteQueryName)) === true;

    if (!isDeleting) {
      if (isEditing) params.delete(editQueryName);
      else params.set(editQueryName, 'true');

      replace(`${pathname}?${params.toString()}`);
    }
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
