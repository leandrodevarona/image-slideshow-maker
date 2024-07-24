'use client';

import { NotificationTypes } from '@ism/app/components/common/notifications/Notification';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function useNotify() {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const showNotify = (type: NotificationTypes, message: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.set(type, message);

      replace(`${pathname}?${params.toString()}`);
    });
  };

  const hideNotify = (type: NotificationTypes) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.delete(type);

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return { isPending, showNotify, hideNotify };
}
