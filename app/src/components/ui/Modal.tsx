'use client';
import { Dispatch, SetStateAction } from 'react';

export function Modal({
  isOpen,
  children,
}: {
  isOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <div className="modal" onClick={() => isOpen(false)}>
      <div className="modal-content">{children}</div>
    </div>
  );
}
