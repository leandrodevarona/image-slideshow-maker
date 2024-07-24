'use client';

import { CrossCircledIcon } from '@radix-ui/react-icons';
import { deleteAction } from '@ism/app/[slideshowId]/lib/actions/slides';
import { useTransition } from 'react';

import './styles/deleteSlideItem.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function DeleteSlideItem({ slideshowId, slideId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleOnClick = () => {
    startTransition(() => {
      deleteAction(slideshowId, slideId);
    });
  };

  return (
    <button
      className="delete_slide__item"
      title="Delete this slide"
      disabled={isPending}
      onClick={handleOnClick}
    >
      <CrossCircledIcon color="red" width={20} height={20} />
    </button>
  );
}
