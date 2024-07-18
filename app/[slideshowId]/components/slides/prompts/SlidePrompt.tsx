'use client';

import SlidePromptWidthSetter from './SlidePromptWidthSetter';
import SlidePromptTextarea from './SlidePromptTextarea';
import SlidePromptVisibilitySetter from './SlidePromptVisibilitySetter';

import './styles/slidePrompt.css';

type Props = {
  slideAlt?: string | null;
  imgElemId: string;
  updateAlt: (formData: FormData) => Promise<undefined>;
};

export default function SlidePrompt({ slideAlt, imgElemId, updateAlt }: Props) {
  const textareaId = 'slide_prompt__textarea';
  const formId = 'form-' + textareaId;

  return (
    <form id={formId} className="slide_prompt" action={updateAlt}>
      <SlidePromptVisibilitySetter
        imgElemId={imgElemId}
        renderTextarea={(isVisible) => (
          <SlidePromptTextarea
            id={textareaId}
            formId={formId}
            defaultValue={slideAlt || ''}
            isVisible={isVisible}
          />
        )}
      />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={textareaId}
      />
    </form>
  );
}
