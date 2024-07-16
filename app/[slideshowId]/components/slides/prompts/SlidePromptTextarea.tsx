'use client';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';

type Props = {
  id: string;
  defaultValue: string;
  updateAction: (formData: FormData) => Promise<undefined>;
};

export default function SlidePromptTextarea({
  id,
  defaultValue,
  updateAction,
}: Props) {
  const formId = 'form-' + id;

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
    <form id={formId} action={updateAction}>
      <TextareaAutosize
        id={id}
        name="alt"
        placeholder="To save press Ctrl+S"
        title={
          defaultValue.length > 0
            ? 'This area will not be seen if you do not define a prompt'
            : undefined
        }
        defaultValue={defaultValue}
        required
      />
    </form>
  );
}
