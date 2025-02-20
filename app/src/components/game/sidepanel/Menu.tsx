'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { usePrivyWalletAddress } from '../../../hooks/privy/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../hooks/useReadContractPuzzleSet';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { useUserPuzzlesSolved } from '../../../hooks/useUserPuzzlesSolved';
import { useProof } from '../../../providers/ProofProvider';
import { composePuzzleRoute } from '../../../utils/composePuzzleRoute';
import { hasSubmittedPuzzle } from '../../../utils/hasSubmittedPuzzle';

export function Menu() {
  const { id, puzzleSet } = useRouteParams();
  const { data: numberOfPuzzlesInSet } =
    useReadContractPuzzleSet('numberOfPuzzles');
  const { address } = usePrivyWalletAddress();
  const router = useRouter();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const { nullifyProofCalldata } = useProof();

  const navigateLevel = (level: number) => {
    if (!puzzleSet) return;
    const newId = String(level);
    nullifyProofCalldata();
    router.push(composePuzzleRoute(puzzleSet, newId));
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
              'relative border border-black text-center',
              'transition-all duration-200 ease-in-out',
              'hover:border-primary hover:scale-[102%] hover:shadow-md',
              hasSubmittedPuzzle(user, i) &&
                'after:absolute after:left-[-20%] after:top-1/2 after:h-[1px] after:w-[141%] after:rotate-[-45deg] after:bg-black',
              Number(id) === i ? 'border-[3px] border-black' : 'p-[3px]'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
