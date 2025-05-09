import { getSlideshowById } from '@ism/app/[slideshowId]/lib/data/slideshow';
import { notFound } from 'next/navigation';
import SlideViewer from '@ism/app/[slideshowId]/components/slideshow/slideviewer/SlideViewer';
import SlidePlayer from '@ism/app/[slideshowId]/components/slideshow/player/SlidePlayer';
import { Metadata } from 'next';
import ColorPaletteLoader from '@ism/app/[slideshowId]/components/slideshow/colors/ColorPaletteLoader';
import LandingPageControls from './components/controls/LandingPageControls';
import { Reset, Next, Previous } from './components/controls/buttons';
import SlidePrompt from './components/SlidePrompt';

import styles from './page.module.css';

type Props = {
  params: {
    slideshowId: string;
  };
  searchParams: {
    slideIndex?: string;
    pause?: string;
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
  searchParams: { slideIndex, pause, fullScreen },
}: Props) {
  const slideshow = await getSlideshowById(slideshowId);

  if (!slideshow) notFound();

  const index = parseInt(slideIndex || '') || 0;

  const currentSlide = slideshow.slides.find((slide) => slide.index === index);

  const slidePlayerKey = 'slide-player-' + currentSlide?.id;

  const imgId = 'slide_viewer__img' + currentSlide?.id;

  const isLastSlide = currentSlide?.index === slideshow.slides.length - 1;

  const slidePromptKey = 'prompt' + currentSlide?.id + fullScreen;

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
            key={slidePromptKey}
            imgElemId={imgId}
            slideAlt={currentSlide.alt}
          />
        )}
        {currentSlide && isLastSlide && (
          <Reset slideDuration={currentSlide.duration} />
        )}
        <LandingPageControls />
        <>
          <Previous />
          <Next slideLength={slideshow.slides.length} />
        </>
      </SlideViewer>
      {currentSlide && (
        <SlidePlayer
          key={slidePlayerKey}
          slideDuration={currentSlide?.duration}
          slidesLength={slideshow.slides.length}
          imgElemId={imgId}
          pause={Boolean(pause)}
        />
      )}
      {slideshow.colorPalette && (
        <ColorPaletteLoader colorPalette={slideshow.colorPalette} />
      )}
    </main>
  );
}
