import { Slide } from '@prisma/client';
import SlidePromptWidthSetter from './SlidePromptWidthSetter';
import SlidePromptTextarea from './SlidePromptTextarea';

import './styles/slidePrompt.css';

type Props = {
  slide: Slide;
  imgElemId: string;
};

export default function SlidePrompt({ slide, imgElemId }: Props) {
  const textareaId = 'slide_prompt__textarea';

  return (
    <div className="slide_prompt">
      <SlidePromptTextarea
        key={'prompt' + slide.id}
        id={textareaId}
        defaultValue={slide.alt || ''}
      />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={textareaId}
      />
    </div>
  );
}
