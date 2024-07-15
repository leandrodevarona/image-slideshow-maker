'use client';

import ReactTextareaAutosize from 'react-textarea-autosize';

type Props = {
  id: string;
  defaultValue: string;
};

export default function SlidePromptTextarea({ id, defaultValue }: Props) {
  return (
    <ReactTextareaAutosize
      id={id}
      name="alt"
      defaultValue={defaultValue}
      maxRows={4}
    />
  );
}
