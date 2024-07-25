'use client';

import useSeeSlide from '@ism/app/[slideshowId]/lib/hooks/useSeeSlide';
import { ResetIcon } from '@radix-ui/react-icons';
import { MouseEvent, Suspense, useEffect, useState } from 'react';

import './styles/reset.css';

type Props = {
  slideDuration: number;
};

function Component({ slideDuration }: Props) {
  const { isPending, currentIndex, seeSlide } = useSeeSlide();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setHidden(false), slideDuration * 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex, slideDuration]);

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    seeSlide(0);
  };

  return (
    <button
      className="reset_button primary_button centered_button"
      disabled={isPending}
      style={{ display: hidden ? 'none' : 'flex' }}
      title="Reset slideshow"
      aria-label="Reset slideshow"
      onClick={handleOnClick}
    >
      <ResetIcon width={100} height={100} />
    </button>
  );
}

export default function Reset(props: Props) {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
}
