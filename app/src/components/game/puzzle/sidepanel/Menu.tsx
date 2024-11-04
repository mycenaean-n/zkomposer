import clsx from 'clsx';
import { Address } from 'viem';
import { useProofCalldata } from '../../../../context/ProofContext';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../../hooks/useReadContract';
import { useUserPuzzlesSolved } from '../../../../hooks/useUserPuzzlesSolved';
import { hasSubmittedPuzzle } from '../../../../utils/hasSubmittedPuzzle';

type MenuProps = {
  puzzleSet: Address | null;
  puzzleId: string | null;
};

export function Menu({ puzzleId, puzzleSet }: MenuProps) {
  const { data: numberOfPuzzlesInSet } =
    useReadContractPuzzleSet('numberOfPuzzles');
  const address = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const { nullifyProofCalldata } = useProofCalldata();

  const navigateLevel = (level: number) => {
    const newId = String(level);
    const newRoute = `/puzzle/${puzzleSet}/${newId}`;
    nullifyProofCalldata();
    window.history.pushState(null, '', newRoute);
  };

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
              hasSubmittedPuzzle(user, i) && 'bg-green-500',
              Number(puzzleId) === i && 'border-[3px] border-black'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
