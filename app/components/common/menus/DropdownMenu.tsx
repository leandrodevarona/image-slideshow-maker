import { CSSProperties } from 'react';
import clsx from 'clsx';

import './styles/dropdownMenu.css';

type Props = {
  id: string;
  className?: string;
  contentClassName?: string;
  buttonClassName?: string;
  contentStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  buttonContent?: React.ReactNode;
  open?: boolean;
  children: React.ReactNode;
};

export default function DropdownMenu({
  id,
  className,
  contentClassName,
  buttonClassName,
  contentStyle,
  buttonStyle,
  buttonContent,
  open = false,
  children,
}: Props) {
  return (
    <div
      className={clsx('dropdown_menu', className)}
      style={{ '--dropdown-id': `"${id}"` } as CSSProperties}
    >
      <input
        id={`dropdown-${id}`}
        className="dropdown_menu__open"
        type="checkbox"
        hidden
        defaultChecked={open}
      />
      <label
        className={buttonClassName}
        style={buttonStyle}
        htmlFor={`dropdown-${id}`}
      >
        {buttonContent}
      </label>
      <menu
        className={clsx('dropdown_menu__content', contentClassName)}
        style={contentStyle}
      >
        {children}
      </menu>
    </div>
  );
}
