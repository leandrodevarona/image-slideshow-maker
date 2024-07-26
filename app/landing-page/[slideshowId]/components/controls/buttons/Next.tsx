'use client';

import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';
import { CaretRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Suspense } from 'react';

type Props = {
  slideLength: number;
};

function Component({ slideLength }: Props) {
  const { isPending, currentIndex, seeSlide } = useSeeSlide();

  const length = slideLength - 1;

  const handleOnClick = () => {
    if (currentIndex >= length) return;

    const newIndex = currentIndex + 1;

    seeSlide(newIndex);
  };

  return (
    <button
      className={clsx(
        'previous_next__button',
        'next_button',
        'primary_button',
        'centered_button',
        currentIndex >= length && 'no_visible'
      )}
      title="Next"
      disabled={isPending}
      onClick={handleOnClick}
    >
      <CaretRightIcon width={30} height={30} />
    </button>
  );
}

export default function Next(props: Props) {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
}
