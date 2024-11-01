import clsx from 'clsx';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useLocalStorage } from '../../../../context/LocalStorageContext';
import { Leaderboard } from './Leaderboard';
import { Menu } from './Menu';

type SidepanelProps = {
  className: string;
};

export function Sidepanel({ className }: SidepanelProps) {
  const [id] = useLocalStorage('puzzleId', '0');

  return (
    <div className={clsx('flex h-full w-72 flex-col gap-6', className)}>
      <Menu />
      <Leaderboard puzzleSet={ZKUBE_PUZZLESET_ADDRESS} puzzleId={id} />
    </div>
  );
}
