'use client';

import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

import './styles/submit.css';

type Props = {
  className?: string;
  ariaLabel?: string;
  title?: string;
  pendingNode?: React.ReactNode;
  children: React.ReactNode;
};

export default function Submit({
  className,
  ariaLabel,
  title,
  pendingNode,
  children,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx('submit', className)}
      type="submit"
      disabled={pending}
      aria-label={ariaLabel}
      title={title}
    >
      {pendingNode && pending ? pendingNode : children}
    </button>
  );
}
