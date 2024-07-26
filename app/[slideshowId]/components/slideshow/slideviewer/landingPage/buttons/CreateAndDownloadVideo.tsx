'use client';

import { Routes } from '@ism/app/lib/utils/routes';
import { DownloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import './styles/landingPageButtons.css';

export default function CreateAndDownloadVideo() {
  const params = useParams<{ slideshowId: string }>();

  const href = Routes.createVideo(params.slideshowId);

  return (
    <Link
      className="landingPage_button primary_button centered_button"
      href={href}
      target="_blank"
      title="Create and download video from slideshow"
      aria-label="Create and download video from slideshow"
    >
      <DownloadIcon />
    </Link>
  );
}
