import clsx from 'clsx';
import { useRouteParams } from '../../../../hooks/useRouteChange';
import { Leaderboard } from './Leaderboard';
import { Menu } from './Menu';

type SidepanelProps = {
  className: string;
};

export function Sidepanel({ className }: SidepanelProps) {
  const { id, puzzleSet } = useRouteParams();

  return (
    <div className={clsx('flex h-full w-72 flex-col gap-6', className)}>
      <Menu puzzleSet={puzzleSet} puzzleId={id} />
      <Leaderboard puzzleSet={puzzleSet} puzzleId={id} />
    </div>
  );
}
