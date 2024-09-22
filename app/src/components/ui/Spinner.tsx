import clsx from 'clsx';

export function Spinner({ isPrimary }: { isPrimary: boolean }) {
  return (
    <div
      className={clsx(
        'mx-auto inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-solid',
        {
          'border-gray-100': isPrimary,
          'border-gray-800': !isPrimary,
        }
      )}
    />
  );
}
