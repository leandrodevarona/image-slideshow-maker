"use client";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { ComponentProps, useEffect, useState } from "react";
import useDeviceDetection, {
  Device,
} from "@ism/app/[slideshowId]/lib/hooks/useDeviceDetection";
import EditPromptModal from "./EditPromptModal";

import "./styles/slidePromptTextarea.css";

type Props = ComponentProps<typeof TextareaAutosize> & {
  action?: (formData: FormData) => Promise<void>;
};

/**
 *
 * @param id The element id
 * @param formId The id of the form element to be able to save with Ctrl+s
 * @param defaultValue The default value of the textarea
 * @returns
 */
export default function SlidePromptTextarea({
  id = "textarea",
  defaultValue,
  action,
  ...rest
}: Props) {
  const [editPrompt, setEditPrompt] = useState(false);

  const device = useDeviceDetection();

  useEffect(() => {
    if (device === Device.Desktop) {
      const textareaElem = document.getElementById(id) as HTMLTextAreaElement;

      if (textareaElem) {
        textareaElem.addEventListener("keydown", async (evt) => {
          if (evt.ctrlKey && evt.key === "s") {
            evt.preventDefault();
            const value = textareaElem.value;
            if (value) {
              const formData = new FormData();
              formData.append("alt", value);
              await action?.(formData);
            }
          }
        });
      }
    }
  }, [id, device, action]);

  const placeholder =
    device === Device.Desktop ? "To save press Ctrl+S" : "Press to edit";

  return (
    <>
      <TextareaAutosize
        id={id}
        className="slide_prompt__textarea"
        name="alt"
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={device === Device.Mobile}
        {...rest}
        onClick={
          device === Device.Mobile ? () => setEditPrompt(true) : undefined
        }
      />
      {device === Device.Mobile && (
        <EditPromptModal
          open={editPrompt}
          defaultValue={defaultValue}
          action={action}
          onClose={() => setEditPrompt(false)}
        />
      )}
    </>
  );
}
