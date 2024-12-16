import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';

type ModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-[backdrop-filter] duration-100 ease-in"
      onClick={() => setIsOpen(false)}
      {...props}
    >
      <div
        className={clsx(
          'bg-secondary relative flex flex-col items-stretch rounded-lg border-2 py-6 text-white shadow-lg md:px-4',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
