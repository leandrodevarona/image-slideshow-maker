import { Slide } from '@prisma/client';
import SlidePromptWidthSetter from './SlidePromptWidthSetter';

import './styles/slidePrompt.css';
import SlidePromptTextarea from './SlidePromptTextarea';

type Props = {
  slide: Slide;
  imgElemId: string;
};

export default function SlidePrompt({ slide, imgElemId }: Props) {
  const textareaId = 'slide_prompt__textarea';

  return (
    <div className="slide_prompt">
      <SlidePromptTextarea id={textareaId} defaultValue={slide.alt || ''} />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={textareaId}
      />
    </div>
  );
}
