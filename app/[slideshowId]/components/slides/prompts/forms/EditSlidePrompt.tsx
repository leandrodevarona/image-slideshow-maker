"use client";

import SlidePrompt from "../SlidePrompt";
import SlidePromptTextarea from "../textarea/SlidePromptTextarea";

import "./styles/editSlidePrompt.css";

type Props = {
  slideAlt: string | null;
  imgElemId: string;
  updateAlt: (formData: FormData) => Promise<void>;
};

export default function EditSlidePrompt({
  slideAlt,
  imgElemId,
  updateAlt,
}: Props) {
  const textareaId = "slide_prompt__textarea";

  return (
    <SlidePrompt
      textareaId={textareaId}
      imgElemId={imgElemId}
      renderTextBox={(isVisible) => (
        <SlidePromptTextarea
          id={textareaId}
          defaultValue={slideAlt || ""}
          style={{ opacity: isVisible ? 1 : 0 }}
          action={updateAlt}
        />
      )}
    ></SlidePrompt>
  );
}
