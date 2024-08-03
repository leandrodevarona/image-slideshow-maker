'use client';

import { useEffect } from 'react';

type Props = {
  menuId: string;
  open: boolean;
};

export default function ModalOpener({ menuId, open }: Props) {
  useEffect(() => {
    if (menuId) {
      const dialog = document.getElementById(menuId) as HTMLDialogElement;
      if (dialog) {
        if (open) {
          dialog.showModal();
        } else {
          dialog.close();
        }

        return () => dialog.close();
      }
    }
  }, [menuId, open]);

  return null;
}
