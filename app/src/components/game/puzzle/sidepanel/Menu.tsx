import clsx from 'clsx';
import { Address } from 'viem';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../../hooks/useReadContract';
import { useUserPuzzlesSolved } from '../../../../hooks/useUserPuzzlesSolved';

type MenuProps = {
  puzzleSet: Address | null;
  puzzleId: string | null;
};

export function Menu({ puzzleId, puzzleSet }: MenuProps) {
  const navigateLevel = (level: number) => {
    const newId = String(level);
    const newRoute = `/puzzle/${puzzleSet}/${newId}`;
    window.history.pushState(null, '', newRoute);
  };

  const { data: numberOfPuzzlesInSet } =
    useReadContractPuzzleSet('numberOfPuzzles');
  const address = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved(address, ZKUBE_PUZZLESET_ADDRESS);

  return (
    <div className="min-h-24">
      <h1 className="text-primary mb-2 text-lg font-semibold">
        Select a puzzle
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(0,2rem))] grid-rows-2 gap-1">
        {Array.from({ length: Number(numberOfPuzzlesInSet) }).map((_, i) => (
          <button
            key={i}
            onClick={() => navigateLevel(i)}
            className={clsx(
              'border border-black text-center',
              user?.solutions.find((s) => Number(s.puzzleId) === i) &&
                'bg-green-500',
              Number(puzzleId) === i && 'border-2 border-black'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
