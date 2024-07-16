import { Slide } from '@prisma/client';
import SlidePromptWidthSetter from './SlidePromptWidthSetter';
import SlidePromptTextarea from './SlidePromptTextarea';
import { updateAction } from '@ism/app/[slideshowId]/lib/actions/slide';

import './styles/slidePrompt.css';

type Props = {
  slideshowId: string;
  slide: Slide;
  imgElemId: string;
};

export default function SlidePrompt({ slideshowId, slide, imgElemId }: Props) {
  const textareaId = 'slide_prompt__textarea';

  const updateSlide = updateAction.bind(null, slideshowId, slide.id);

  return (
    <div className="slide_prompt">
      <SlidePromptTextarea
        key={'prompt' + slide.id}
        id={textareaId}
        defaultValue={slide.alt || ''}
        updateAction={updateSlide}
      />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={textareaId}
      />
    </div>
  );
}
