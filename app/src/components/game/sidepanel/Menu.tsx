import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Address } from 'viem';
import { useProofCalldata } from '../../../context/ProofContext';
import { usePrivyWalletAddress } from '../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../hooks/useReadContract';
import { useUserPuzzlesSolved } from '../../../hooks/useUserPuzzlesSolved';
import { composePuzzleRoute } from '../../../utils/composePuzzleRoute';
import { hasSubmittedPuzzle } from '../../../utils/hasSubmittedPuzzle';

type MenuProps = {
  puzzleSet: Address | null;
  puzzleId: string | null;
};

export function Menu({ puzzleId, puzzleSet }: MenuProps) {
  const { data: numberOfPuzzlesInSet } =
    useReadContractPuzzleSet('numberOfPuzzles');
  const address = usePrivyWalletAddress();
  const router = useRouter();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const { nullifyProofCalldata } = useProofCalldata();

  const navigateLevel = (level: number) => {
    console.log('navigateLevel', puzzleSet, level);
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
              Number(puzzleId) === i ? 'border-[3px] border-black' : 'p-[3px]'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
