'use client';

import { useFormStatus } from 'react-dom';

import './styles/submit.css';

type Props = {
  className?: string;
  ariaLabel?: string;
  title?: string;
  children: React.ReactNode;
};

export default function Submit({
  className,
  ariaLabel,
  title,
  children,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`submit ${className || ''}`}
      type="submit"
      disabled={pending}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
}
