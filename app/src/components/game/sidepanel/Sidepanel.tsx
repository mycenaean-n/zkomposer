import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { ArrowLeft } from '../../ui/icons/ArrowLeft';
import { ArrowRight } from '../../ui/icons/ArrowRight';
import { Leaderboard } from './Leaderboard';
import { Menu } from './Menu';

type SidepanelProps = {
  className: string;
  isLeaderboardOpen: boolean;
  setIsLeaderboardOpen: Dispatch<SetStateAction<boolean>>;
};

export function Sidepanel({
  className,
  isLeaderboardOpen,
  setIsLeaderboardOpen,
}: SidepanelProps) {
  const { id, puzzleSet } = useRouteParams();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsLeaderboardOpen(true);
      } else {
        setIsLeaderboardOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
        className="w-8"
      >
        {isLeaderboardOpen ? <ArrowRight /> : <ArrowLeft />}
      </button>
      <div className={clsx('flex h-full min-w-72 flex-col gap-6', className)}>
        <Menu puzzleSet={puzzleSet} puzzleId={id} />
        <Leaderboard puzzleSet={puzzleSet} puzzleId={id} />
      </div>
    </div>
  );
}
