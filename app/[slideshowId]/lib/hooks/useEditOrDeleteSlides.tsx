'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function useEditOrDeleteSlides() {
  const deleteQueryName = 'deleteItems';
  const editQueryName = 'editItems';

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isDeleting = Boolean(searchParams.get(deleteQueryName)) === true;
  const isEditing = Boolean(searchParams.get(editQueryName)) === true;

  const editSlides = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isEditing = Boolean(params.get(editQueryName)) === true;

      const isDeleting = Boolean(params.get(deleteQueryName)) === true;

      // Que se cancele la eliminación si decido empezar a editar
      if (isDeleting) params.delete(deleteQueryName);

      if (isEditing) params.delete(editQueryName);
      else params.set(editQueryName, 'true');

      replace(`${pathname}?${params.toString()}`);
    });
  };

  const deleteSlides = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isDeleting = Boolean(params.get(deleteQueryName)) === true;

      const isEditing = Boolean(params.get(editQueryName)) === true;

      // Que cancele la edición si decido empezar a eliminar
      if (isEditing) params.delete(editQueryName);

      if (isDeleting) params.delete(deleteQueryName);
      else params.set(deleteQueryName, 'true');

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return { isPending, isEditing, isDeleting, editSlides, deleteSlides };
}
