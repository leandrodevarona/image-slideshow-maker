'use client';

import { useSearchParams } from 'next/navigation';
import { Cross2Icon } from '@radix-ui/react-icons';
import { MouseEvent, useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import useNotify from '@ism/app/[slideshowId]/lib/hooks/useNotify';

import './styles/notification.css';

export enum NotificationTypes {
  success = 'success',
  error = 'error',
}

export default function Notification() {
  const [text, setText] = useState('');
  const [type, setType] = useState<NotificationTypes>(
    NotificationTypes.success
  );
  const [isVisible, setIsVisible] = useState(false);

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const { hideNotify } = useNotify();

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const isSuccess = params.has(NotificationTypes.success);
      const isError = params.has(NotificationTypes.error);

      if (!isSuccess && !isError) return;

      setType(isSuccess ? NotificationTypes.success : NotificationTypes.error);

      const value = params.get(type.toString()) || '';
      setText(value);

      setIsVisible(true);
    });
  }, [searchParams, type]);

  const handleOnClose = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    hideNotify(type);
    startTransition(() => {
      setIsVisible(false);
    });
  };

  return (
    <article
      className={clsx(
        'notification',
        `notification_${type}`,
        isVisible && 'visible'
      )}
    >
      <p>{text}</p>
      <button onClick={handleOnClose} disabled={isPending}>
        <Cross2Icon width={20} height={20} />
      </button>
    </article>
  );
}
