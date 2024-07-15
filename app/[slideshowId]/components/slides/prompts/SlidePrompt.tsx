import { Slide } from '@prisma/client';
import SlidePromptWidthSetter from './SlidePromptWidthSetter';
import SlidePromptTextarea from './SlidePromptTextarea';
import CreateSlidePrompt from './forms/CreateSlidePrompt';

import './styles/slidePrompt.css';

type Props = {
  slideshowId: string;
  slide: Slide;
  imgElemId: string;
};

export default function SlidePrompt({ slideshowId, slide, imgElemId }: Props) {
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
      <CreateSlidePrompt
        className="slide_prompt__aicreator"
        slideshowId={slideshowId}
        slideId={slide.id}
      />
    </div>
  );
}
