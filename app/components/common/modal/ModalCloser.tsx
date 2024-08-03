'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export type ClosingProps = {
  back?: boolean;
  href?: string;
};

type Props = ClosingProps & { id: string };

export default function ModalCloser({ id, back, href }: Props) {
  const { back: goBack, push } = useRouter();

  useEffect(() => {
    const myDialog = document.getElementById(id) as HTMLDialogElement;
    const contentDialog = document.getElementById('modal_content');

    const onClose = () => {
      if (back) goBack();
      if (href) push(href);
    };

    const stopClose = (event: MouseEvent) => {
      event.stopPropagation();
    };

    if (myDialog) myDialog.addEventListener('click', onClose);
    if (contentDialog) contentDialog.addEventListener('click', stopClose);

    return () => {
      myDialog.removeEventListener('click', onClose);
      contentDialog?.removeEventListener('click', stopClose);
    };
  });

  return null;
}
