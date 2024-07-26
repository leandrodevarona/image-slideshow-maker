'use client';

import { Suspense } from 'react';
import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';
import { CaretLeftIcon } from '@radix-ui/react-icons';

import './styles/previousNext.css';
import clsx from 'clsx';

function Component() {
  const { isPending, currentIndex, seeSlide } = useSeeSlide();

  const handleOnClick = () => {
    if (currentIndex <= 0) return;

    const newIndex = currentIndex - 1;

    seeSlide(newIndex);
  };

  return (
    <button
      className={clsx(
        'previous_next__button',
        'previous_button',
        'primary_button',
        'centered_button',
        currentIndex <= 0 && 'no_visible'
      )}
      title="Previous"
      disabled={isPending}
      onClick={handleOnClick}
    >
      <CaretLeftIcon width={30} height={30} />
    </button>
  );
}

export default function Previous() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
