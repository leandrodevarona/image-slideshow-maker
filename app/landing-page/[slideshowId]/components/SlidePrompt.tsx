'use client';

import SlidePromptT from '@ism/app/[slideshowId]/components/slides/prompts/SlidePrompt';

import './styles/slidePrompt.css';

type Props = {
  slideAlt: string | null;
  imgElemId: string;
};

export default function SlidePrompt({ slideAlt, imgElemId }: Props) {
  const paragraphId = 'slide_prompt__paragraph';

  if (!slideAlt) return null;

  return (
    <SlidePromptT
      imgElemId={imgElemId}
      textareaId={paragraphId}
      renderTextBox={(isVisible) => (
        <p id={paragraphId} style={{ opacity: isVisible ? 1 : 0 }}>
          {slideAlt}
        </p>
      )}
    />
  );
}
