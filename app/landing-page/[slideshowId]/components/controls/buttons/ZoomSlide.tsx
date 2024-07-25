'use client';

import { Cross1Icon, ZoomInIcon } from '@radix-ui/react-icons';
import { Suspense, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import './styles/zoomSlide.css';

function Component() {
  const zoomQueryName = 'zoom';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isZoom = Boolean(searchParams.get(zoomQueryName)) === true;

  const handleOnClick = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isZoom = Boolean(params.get(zoomQueryName)) === true;

      if (isZoom) params.delete(zoomQueryName);
      else params.set(zoomQueryName, 'true');

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <button
      className="zoom_slide__button primary_button centered_button"
      title={isZoom ? 'Exit zoom' : 'Zoom to this slide'}
      aria-label="Zoom to this slide"
      disabled={isPending}
      onClick={handleOnClick}
    >
      {isZoom ? <Cross1Icon /> : <ZoomInIcon />}
    </button>
  );
}

export default function ZoomSlide() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
