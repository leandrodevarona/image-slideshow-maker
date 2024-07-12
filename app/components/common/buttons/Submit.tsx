'use client';

import { useFormStatus } from 'react-dom';

import './styles/submit.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Submit({ className, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`submit ${className || ''}`}
      type="submit"
      disabled={pending}
    >
      {children}
    </button>
  );
}
