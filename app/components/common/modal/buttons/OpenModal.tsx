'use client';

import { useRouter } from 'next/navigation';

type Props = {
  menuId?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

export default function OpenModal({
  menuId,
  href,
  className,
  children,
}: Props) {
  const { push } = useRouter();

  const handleOnClick = () => {
    if (href) push(href);

    if (menuId) {
      const dialog = document.getElementById(menuId) as HTMLDialogElement;
      if (dialog) {
        dialog.showModal();
      }
    }
  };

  return (
    <button className={className} onClick={handleOnClick}>
      {children}
    </button>
  );
}
