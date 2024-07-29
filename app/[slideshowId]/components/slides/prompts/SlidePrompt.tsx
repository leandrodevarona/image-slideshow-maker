'use client';

import SlidePromptWidthSetter from './SlidePromptWidthSetter';
import SlidePromptVisibilitySetter from './SlidePromptVisibilitySetter';

import './styles/slidePrompt.css';

type Props = {
  textareaId: string;
  imgElemId: string;
  renderTextBox: (isVisible: boolean) => React.ReactNode;
};

export default function SlidePrompt({
  textareaId,
  imgElemId,
  renderTextBox,
}: Props) {
  return (
    <div className="slide_prompt">
      <SlidePromptVisibilitySetter
        imgElemId={imgElemId}
        renderTextBox={renderTextBox}
      />
      <SlidePromptWidthSetter
        imgElemId={imgElemId}
        textareaElemId={textareaId}
      />
    </div>
  );
}
