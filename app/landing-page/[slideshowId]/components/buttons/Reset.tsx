'use client';

import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';
import { ResetIcon } from '@radix-ui/react-icons';
import { MouseEvent, useEffect, useState } from 'react';

import './styles/reset.css';

type Props = {
  slidesLength: number;
  slideDuration: number;
};

export default function Reset({ slidesLength, slideDuration }: Props) {
  const { isPending, currentIndex, seeSlide } = useSeeSlide();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (currentIndex === slidesLength - 1) {
      const timeout = setTimeout(() => setHidden(false), slideDuration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, slideDuration, slidesLength]);

  if (currentIndex < slidesLength - 1) return null;

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    seeSlide(0);
  };

  return (
    <button
      className="reset_button primary_button"
      disabled={isPending}
      style={{ display: hidden ? 'none' : 'flex' }}
      onClick={handleOnClick}
    >
      <ResetIcon width={100} height={100} />
    </button>
  );
}
