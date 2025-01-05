import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { Button } from '../../../ui/Button';

type ActionButtonProps = {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  onClick,
  variant,
  fullWidth,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={clsx(
        'min-h-6 w-full border border-black text-sm',
        fullWidth && 'col-span-full'
      )}
      type="button"
      rounded
      {...props}
    >
      {children}
    </Button>
  );
}
