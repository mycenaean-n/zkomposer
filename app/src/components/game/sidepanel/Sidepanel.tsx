'use client';
import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';
import { useLeaderboard } from '../../../providers/LeaderboardProvider';
import { ArrowLeft } from '../../ui/icons/ArrowLeft';
import { ArrowRight } from '../../ui/icons/ArrowRight';
import { Skeleton } from '../../ui/skeleton/Skeleton';
import { Leaderboard } from './Leaderboard';
import { Menu } from './Menu';

type SidepanelProps = {
  className: string;
};

export function Sidepanel({ className }: SidepanelProps) {
  const { isLeaderboardOpen, setIsLeaderboardOpen } = useLeaderboard();
  const { ready } = usePrivy();

  if (!ready) {
    return <Skeleton className={className} />;
  }

  return (
    <div
      className={clsx(
        'absolute right-0 top-0 flex h-full gap-2 bg-white px-2 shadow-xl transition-all duration-700 ease-in-out md:relative',
        isLeaderboardOpen ? 'w-[22rem]' : 'w-8',
        className
      )}
    >
      <button
        type="button"
        onClick={() => {
          setIsLeaderboardOpen(!isLeaderboardOpen);
        }}
        className="w-8"
      >
        {isLeaderboardOpen ? <ArrowRight /> : <ArrowLeft />}
      </button>
      <div className={clsx('flex h-full min-w-72 flex-col gap-6', className)}>
        <Menu />
        <Leaderboard />
      </div>
    </div>
  );
}
