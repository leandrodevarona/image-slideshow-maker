import Image from 'next/image';
import { getSlideshowById } from './lib/data/slideshow';
import { notFound } from 'next/navigation';
import SlideEditor from './components/slideshow/SlideEditor';
import EditSlideshow from './components/slideshow/forms/EditSlideshow';

import styles from './page.module.css';

type Props = {
  params: {
    slideshowId: string;
  };
  searchParams: {
    slideIndex?: string;
    photos?: string;
    editItems?: string;
    deleteItems?: string;
    pause?: string;
  };
};

export default async function SlideshowPage({
  params: { slideshowId },
  searchParams: { slideIndex, photos, editItems, deleteItems, pause },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  return (
    <main className={styles.main}>
      <header className={styles.description}>
        <div className={styles.description_form}>
          Start by editing the{' '}
          <EditSlideshow
            slideshowId={slideshow.id}
            slideshowName={slideshow.name}
          />
        </div>
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
        <SlideEditor
          slideshow={slideshow}
          slideIndex={Number(slideIndex) || 0}
          photosQuery={photos}
          editItems={Boolean(editItems)}
          deleteItem={Boolean(deleteItems)}
          pause={Boolean(pause)}
        />
      </div>
      <footer></footer>
    </main>
  );
}
