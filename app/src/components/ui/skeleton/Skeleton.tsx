import clsx from 'clsx';
import './styles.css';

export function Skeleton({ className }: { className: string }) {
  return <div className={clsx('skeleton', className)} />;
}
