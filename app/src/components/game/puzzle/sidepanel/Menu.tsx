import clsx from 'clsx';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useLocalStorage } from '../../../../context/LocalStorageContext';
import { useReadContractPuzzleSet } from '../../../../hooks/fetching/useReadContract';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useUserPuzzlesSolved } from '../../../../hooks/useUserPuzzlesSolved';

export function Menu() {
  const [id, setId] = useLocalStorage('puzzleId', '0');

  const navigateLevel = (level: number) => {
    setId(level.toString());
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
              Number(id) === i && 'border-2 border-black'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
