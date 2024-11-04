'use client';
import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useProofCalldata } from '../../../../context/ProofContext';
import { useContractWriteZKube } from '../../../../hooks/useContractWrite';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../../hooks/useReadContract';
import { useRouteParams } from '../../../../hooks/useRouteChange';
import { useUserPuzzlesSolved } from '../../../../hooks/useUserPuzzlesSolved';
import { GameMode } from '../../../../types/Game';
import { ZKProofCalldata } from '../../../../types/Proof';
import { hasSubmittedPuzzle } from '../../../../utils/hasSubmittedPuzzle';
import { Button } from '../../../ui/Button';

type LevelActionProps = {
  proofCalldata: ZKProofCalldata | null;
  gameMode: GameMode;
  error: Error | null;
};

export function LevelAction({
  proofCalldata,
  error: proofError,
}: LevelActionProps) {
  const [error, setError] = useState<Error | null>(null);
  const { callback: submitSolution, error: submitSolutionError } =
    useContractWriteZKube('submitSolution');
  const { login } = usePrivy();
  const { data: puzzlesInSet } = useReadContractPuzzleSet('numberOfPuzzles');
  const { id, puzzleSet } = useRouteParams();
  const address = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const { nullifyProofCalldata } = useProofCalldata();

  const hasUserSubmittedPuzzle = hasSubmittedPuzzle(user, id);
  const isLastInSet = Number(puzzlesInSet) === Number(id) + 1;

  useEffect(() => {
    setError(proofError);
  }, [proofError]);

  useEffect(() => {
    if (
      submitSolutionError?.message.includes('The total cost (gas * gas fee')
    ) {
      setError(new Error('Click "Faucet", get money'));
    } else {
      setError(submitSolutionError);
    }
  }, [submitSolutionError]);

  const handleNextLevel = () => {
    const newId = String(Number(id) + 1);
    const newRoute = `/puzzle/${puzzleSet}/${newId}`;
    nullifyProofCalldata();
    window.history.pushState(null, '', newRoute);
  };

  const onClick = async (proofCd: ZKProofCalldata) => {
    if (!address) {
      login();
    } else {
      submitSolution([ZKUBE_PUZZLESET_ADDRESS, BigInt(id as string), proofCd]);
    }
  };

  return (
    <div className="absolute bottom-14 right-4 grid grid-cols-2 gap-2">
      {!error && proofCalldata ? (
        <>
          <div className="col-span-full flex items-center justify-center gap-2">
            <h1 className="text-lg">🎉 Puzzle Solved 🎉</h1>
          </div>
          {!hasUserSubmittedPuzzle ? (
            <Button
              onClick={() => onClick(proofCalldata)}
              variant="secondary"
              className={clsx(
                'min-h-6 w-full border border-black text-sm',
                isLastInSet && 'col-span-full'
              )}
              type="button"
              rounded
            >
              Submit
            </Button>
          ) : null}
          {!isLastInSet ? (
            <Button
              onClick={handleNextLevel}
              variant="primary"
              className={clsx(
                'min-h-6 w-full border border-black text-sm',
                hasUserSubmittedPuzzle && 'col-span-full'
              )}
              type="button"
              rounded
            >
              Next Level
            </Button>
          ) : null}
        </>
      ) : null}
      {error ? (
        <div className="col-span-full">
          {error ? (
            <h1 className="text-sm">{error?.message.slice(0, 50)}</h1>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
