import { notFound } from 'next/navigation';
import { getSlideshowById } from '../lib/data/slideshow';
import CreateVideo from './components/CreateVideo';
import NoSSRWrapper from './components/NoSSRWrapper';
import { VideoQuality } from '../lib/hooks/useCreateSlideshowVideo';
import { Metadata } from 'next';

import styles from './page.module.css';

type Props = {
  params: {
    slideshowId: string;
  };
  searchParams: {
    quality?: string;
  };
};

export async function generateMetadata({
  params: { slideshowId },
}: Props): Promise<Metadata> {
  // read route params
  const slideshow = await getSlideshowById(slideshowId);

  const title = `Create video by ${slideshow?.name} project`;

  return {
    title,
  };
}

export default async function CreateVideoPage({
  params: { slideshowId },
  searchParams: { quality },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  return (
    <main className={styles.main}>
      <NoSSRWrapper>
        <CreateVideo slideshow={slideshow} quality={quality as VideoQuality} />
      </NoSSRWrapper>
    </main>
  );
}
