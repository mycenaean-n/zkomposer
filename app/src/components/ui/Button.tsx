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
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  className,
  loading,
  type = 'button',
  rounded = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-disabled={loading || disabled}
      disabled={loading || disabled}
      className={clsx(
        'flex h-full items-center justify-center px-2 py-0.5 md:px-4 md:py-1',
        buttonVariants[variant],
        className,
        rounded ? 'rounded-md' : '',
        disabled ? 'bg-gray-500 opacity-50' : ''
      )}
      type={type}
      {...props}
    >
      {loading ? <Spinner isPrimary={variant === 'primary'} /> : children}
    </button>
  );
};
