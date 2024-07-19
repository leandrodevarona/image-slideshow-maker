'use client';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';

type Props = {
  id: string;
  formId: string;
  defaultValue: string;
  isVisible?: boolean;
};

/**
 *
 * @param id The element id
 * @param formId The id of the form element to be able to save with Ctrl+s
 * @param defaultValue The default value of the textarea
 * @param isVisible To know if the textarea component should be shown or not
 * @returns
 */
export default function SlidePromptTextarea({
  id,
  formId,
  defaultValue,
  isVisible = true,
}: Props) {
  useEffect(() => {
    const textareaElem = document.getElementById(id);

    if (textareaElem) {
      textareaElem.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 's') {
          event.preventDefault();
          const formElem = document.getElementById(formId) as HTMLFormElement;
          if (formElem) formElem.requestSubmit();
        }
      });
    }
  }, [id, formId]);

  return (
    <TextareaAutosize
      id={id}
      name="alt"
      placeholder="To save press Ctrl+S"
      title={
        defaultValue.length <= 0
          ? 'This area will not be seen if you do not define a prompt'
          : undefined
      }
      defaultValue={defaultValue}
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
}
