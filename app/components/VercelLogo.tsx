import Image from 'next/image';

import './styles/vercelLogo.css';

export default function VercelLogo() {
  return (
    <a
      className="vercel_logo"
      href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      By{' '}
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      />
    </a>
  );
}
