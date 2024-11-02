'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useContractWriteZKube } from '../../../../hooks/useContractWrite';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../../hooks/useReadContract';
import { useRouteParams } from '../../../../hooks/useRouteChange';
import { GameMode } from '../../../../types/Game';
import { ZKProofCalldata } from '../../../../types/Proof';
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
  const { id, puzzleSet } = useRouteParams();
  const { data: puzzlesInSet } = useReadContractPuzzleSet('numberOfPuzzles');
  const walletAddress = usePrivyWalletAddress();

  useEffect(() => {
    setError(proofError);
  }, [proofError]);

  useEffect(() => {
    setError(submitSolutionError);
  }, [submitSolutionError]);

  const handleNextLevel = () => {
    const newId = String(Number(id) + 1);
    const newRoute = `/puzzle/${puzzleSet}/${newId}`;

    window.history.pushState(null, '', newRoute);
  };

  const onClick = async (proofCd: ZKProofCalldata) => {
    if (!walletAddress) {
      login();
    } else {
      submitSolution([ZKUBE_PUZZLESET_ADDRESS, BigInt(id as string), proofCd]);
    }
  };

  return (
    <div className="absolute bottom-14 right-4 grid grid-cols-2 gap-2">
      {proofCalldata ? (
        <>
          <div className="col-span-full flex items-center justify-center gap-2">
            <h1 className="text-lg">🎉 Puzzle Solved 🎉</h1>
          </div>
          <Button
            onClick={() => onClick(proofCalldata)}
            variant="secondary"
            className="min-h-6 w-full border border-black text-sm"
            type="button"
            rounded
          >
            Submit
          </Button>
          {Number(puzzlesInSet) > Number(id) + 1 ? (
            <Button
              onClick={handleNextLevel}
              variant="primary"
              className="min-h-6 w-full border border-black text-sm"
              type="button"
              rounded
            >
              Next Level
            </Button>
          ) : null}
        </>
      ) : (
        <div className="col-span-full">
          {error ? <h1 className="text-lg">{error?.message}</h1> : null}
        </div>
      )}
    </div>
  );
}
