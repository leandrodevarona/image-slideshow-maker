import SlidePromptWidthSetter from '@ism/app/[slideshowId]/components/slides/prompts/SlidePromptWidthSetter';
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
      <p id={paragraphId}>{slide.alt}</p>
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={paragraphId}
      />
    </div>
  );
}
