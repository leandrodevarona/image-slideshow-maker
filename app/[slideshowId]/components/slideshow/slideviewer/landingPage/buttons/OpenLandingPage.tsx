'use client';

import { Routes } from '@ism/app/lib/utils/routes';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import './styles/landingPageButtons.css';

export default function OpenLandingPage() {
  const params = useParams<{ slideshowId: string }>();

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !params.slideshowId) return;

    const landingUrl =
      window.location.origin + Routes.landingPage(params.slideshowId);

    if (!landingUrl) return;

    setUrl(landingUrl);
  }, [params.slideshowId]);

  if (!url) return null;

  return (
    <Link
      className="landingPage_button primary_button"
      href={url}
      target="_blank"
      title="See the result of the edition on a landing page"
      aria-label="See the result of the edition on a landing page"
    >
      <OpenInNewWindowIcon />
    </Link>
  );
}
