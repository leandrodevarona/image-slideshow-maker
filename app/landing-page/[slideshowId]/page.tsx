import { getSlideshowById } from '@ism/app/[slideshowId]/lib/data/slideshow';
import { notFound } from 'next/navigation';
import SlideViewer from '@ism/app/[slideshowId]/components/slideshow/slideviewer/SlideViewer';
import { Suspense } from 'react';
import SlidePlayer from '@ism/app/[slideshowId]/components/slideshow/player/SlidePlayer';
import { Metadata } from 'next';
import SlidePrompt from './components/SlidePrompt';
import ColorPaletteLoader from '@ism/app/[slideshowId]/components/slideshow/colors/ColorPaletteLoader';
import Reset from './components/controls/buttons/Reset';
import LandingPageControls from './components/controls/LandingPageControls';

import styles from './page.module.css';

type Props = {
  params: {
    slideshowId: string;
  };
  searchParams: {
    slideIndex?: string;
    fullScreen?: string;
  };
};

export async function generateMetadata({
  params: { slideshowId },
}: Props): Promise<Metadata> {
  // read route params
  const slideshow = await getSlideshowById(slideshowId);

  return {
    title: slideshow?.name,
  };
}

export default async function SlideshowLandingPage({
  params: { slideshowId },
  searchParams: { slideIndex, fullScreen },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  const index = parseInt(slideIndex || '') || 0;

  const currentSlide = slideshow.slides.find((slide) => slide.index === index);

  const slidePlayerKey = 'slide-player-' + currentSlide?.id;

  const imgId = 'slide_viewer__img' + currentSlide?.id;

  const isLastSlide = currentSlide?.index === slideshow.slides.length - 1;

  return (
    <main className={styles.main}>
      <SlideViewer
        className={styles.main_slide__viewer}
        imgElemId={imgId}
        slide={currentSlide}
        fullScreen={Boolean(fullScreen)}
      >
        {currentSlide && (
          <SlidePrompt
            key={fullScreen}
            slide={currentSlide}
            imgElemId={imgId}
          />
        )}
        {currentSlide && isLastSlide && (
          <Suspense>
            <Reset slideDuration={currentSlide.duration} />
          </Suspense>
        )}
        <LandingPageControls />
      </SlideViewer>
      {currentSlide && (
        <Suspense>
          <SlidePlayer
            key={slidePlayerKey}
            slideDuration={currentSlide?.duration}
            slidesLength={slideshow.slides.length}
            imgElemId={imgId}
          />
        </Suspense>
      )}
      {slideshow.colorPalette && (
        <ColorPaletteLoader colorPalette={slideshow.colorPalette} />
      )}
    </main>
  );
}
