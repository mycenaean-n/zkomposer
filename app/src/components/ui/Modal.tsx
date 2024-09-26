'use client';

import clsx from 'clsx';
import React from 'react';

type ModalProps = {
  setIsOpen: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Modal({
  setIsOpen,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <div className="modal" onClick={setIsOpen} {...props}>
      <div className={clsx('modal-content', className)}>{children}</div>
    </div>
  );
}
