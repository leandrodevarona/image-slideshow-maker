import Image from 'next/image';
import { getSlideshowById } from './lib/data/data';

import styles from './page.module.css';
import { notFound, redirect } from 'next/navigation';
import SlideEditor from './components/slideshow/SlideEditor';

type Props = {
  params: {
    slideshowId: string;
  };
};

export default async function SlideshowPage({
  params: { slideshowId },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  return (
    <main className={styles.main}>
      <header className={styles.description}>
        <p>
          Start by editing the{' '}
          <code className={styles.code}>{slideshow?.name}</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </header>
      <div className={styles.center}>
        <SlideEditor slideshow={slideshow} />
      </div>
      <footer></footer>
    </main>
  );
}
