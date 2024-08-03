import Header from './components/Header';
import CreateSlideshowAiModal from './components/slideshow/modals/CreateSlideshowAiModal';

import styles from './page.module.css';

type Props = {
  searchParams: {
    useAi?: string;
  };
};

export default function Home({ searchParams: { useAi } }: Props) {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.main_video__container}>
        <video autoPlay muted playsInline loop>
          <source src="/presentation.mp4" type="video/mp4" />
        </video>
      </div>
      <CreateSlideshowAiModal open={Boolean(useAi)} />
    </main>
  );
}
