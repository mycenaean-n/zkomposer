import clsx from 'clsx';
import { Radio } from 'react-aria-components';

export function RadioButton({
  mode,
  children,
  ...props
}: {
  mode: string;
  children: React.ReactNode;
  props?: React.ComponentProps<typeof Radio>;
}) {
  return (
    <Radio
      value={mode}
      className={({ isSelected }) =>
        clsx(
          'border-secondary bg-primary group relative flex cursor-pointer items-center justify-center rounded-md border-2 border-solid px-2 py-0.5 md:px-2 md:py-1',
          isSelected
            ? 'bg-secondary border-secondary text-primary'
            : 'text-secondary'
        )
      }
      {...props}
    >
      <div className="inline-flex items-center gap-1 text-sm">{children}</div>
    </Radio>
  );
}
