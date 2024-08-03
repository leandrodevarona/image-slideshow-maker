import { getSlideshowById } from './lib/data/slideshow';
import { notFound } from 'next/navigation';
import SlideEditor from './components/slideshow/SlideEditor';
import EditSlideshowName from './components/slideshow/forms/EditSlideshowName';
import ColorPaletteLoader from './components/slideshow/colors/ColorPaletteLoader';
import VercelLogo from '../components/VercelLogo';

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
          <span>Start by editing the </span>
          <EditSlideshowName
            slideshowId={slideshow.id}
            slideshowName={slideshow.name}
          />
        </div>
        <div>
          <VercelLogo />
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
      {slideshow.colorPalette && (
        <ColorPaletteLoader colorPalette={slideshow.colorPalette} />
      )}
    </main>
  );
}
