import { notFound } from 'next/navigation';
import { getSlideshowById } from '../lib/data/slideshow';
import CreateVideo from './components/CreateVideo';
import NoSSRWrapper from './components/NoSSRWrapper';

import styles from './page.module.css';

type Props = {
  params: {
    slideshowId: string;
  };
};

export default async function CreateVideoPage({
  params: { slideshowId },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  return (
    <main className={styles.main}>
      <h1>Please do not refresh or close this page</h1>
      <NoSSRWrapper>
        <CreateVideo slideshow={slideshow} />
      </NoSSRWrapper>
    </main>
  );
}
