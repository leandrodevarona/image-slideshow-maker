import React from 'react';
import { CSSProperties } from 'react';
import ModalOpener from './ModalOpener';
import CloseModal, { ClosingProps } from './buttons/CloseModal';
import clsx from 'clsx';

import './styles/modal.css';

export type ModalProps = {
  id: string;
  open?: boolean;
  className?: string;
  style?: CSSProperties;
  close?: ClosingProps;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  id,
  open,
  className,
  style,
  close,
  title,
  children,
}: ModalProps) {
  return (
    <dialog id={id} className={clsx('modal', className)} style={style}>
      <ModalOpener menuId={id} open={open || false} />
      <form action="dialog">
        <section
          className="modal_close"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <span className="modal_title">{title}</span>
          <CloseModal id={id} {...close} />
        </section>
      </form>
      <div id="modal_content" className="modal_content">
        {children}
      </div>
    </dialog>
  );
}
