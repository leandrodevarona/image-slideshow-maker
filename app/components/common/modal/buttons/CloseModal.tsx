'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export type ClosingProps = {
  back?: boolean;
  href?: string;
};

type Props = ClosingProps & { id: string };

export default function CloseModal({ id, back, href }: Props) {
  const { back: backRoute, push } = useRouter();

  const handleCloseModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) modal.close();
    if (href) return push(href);
    if (back) backRoute();
  };

  return (
    <button
      type="reset"
      style={{ cursor: 'pointer' }}
      onClick={handleCloseModal}
    >
      <Cross1Icon />
    </button>
  );
}
