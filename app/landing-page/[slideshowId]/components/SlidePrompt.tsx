'use client';

import SlidePromptWidthSetter from '@ism/app/[slideshowId]/components/slides/prompts/SlidePromptWidthSetter';
import SlidePromptVisibilitySetter from '@ism/app/[slideshowId]/components/slides/prompts/SlidePromptVisibilitySetter';
import { Slide } from '@prisma/client';

import './styles/slidePrompt.css';

type Props = {
  slide: Slide;
  imgElemId: string;
};

export default function SlidePrompt({ slide, imgElemId }: Props) {
  const paragraphId = 'slide_prompt__paragraph';

  if (!slide.alt) return null;

  return (
    <div className="slide_prompt">
      <SlidePromptVisibilitySetter
        imgElemId={imgElemId}
        renderTextarea={(isVisible) => (
          <p id={paragraphId} style={{ opacity: isVisible ? 1 : 0 }}>
            {slide.alt}
          </p>
        )}
      />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={paragraphId}
      />
    </div>
  );
}
