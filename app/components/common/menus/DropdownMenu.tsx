import { CSSProperties } from 'react';
import clsx from 'clsx';

import './styles/dropdownMenu.css';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
  id: string;
  className?: string;
  contentClassName?: string;
  buttonClassName?: string;
  contentStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  buttonContent?: React.ReactNode;
  open?: boolean;
  title?: string;
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
  title,
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
        title={title}
      >
        {buttonContent}
      </label>
      <menu
        className={clsx('dropdown_menu__content', contentClassName)}
        style={contentStyle}
      >
        <header className='dropdown_menu__content-close'>
          <label
            htmlFor={`dropdown-${id}`}
            title="Close menu"
          >
            <Cross1Icon />
          </label>
        </header>
        {children}
      </menu>
    </div>
  );
}
