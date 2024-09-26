'use client';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';

const buttonVariants = {
  primary: 'bg-primary text-secondary',
  secondary: 'bg-secondary text-primary',
  transparent: 'text-primary bg-transparent',
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  rounded?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  className,
  disabled,
  type = 'button',
  rounded = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      className={clsx(
        'flex h-full items-center justify-center px-2 py-0.5 md:px-4 md:py-1',
        buttonVariants[variant],
        className,
        rounded ? 'rounded-md' : ''
      )}
      type={type}
      {...props}
    >
      {disabled ? <Spinner isPrimary={variant === 'primary'} /> : children}
    </button>
  );
};
