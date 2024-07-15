'use client';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';

type Props = {
  id: string;
  defaultValue: string;
};

export default function SlidePromptTextarea({ id, defaultValue }: Props) {
  return (
    <TextareaAutosize
      id={id}
      name="alt"
      placeholder="To save press Enter"
      defaultValue={defaultValue}
    />
  );
}
