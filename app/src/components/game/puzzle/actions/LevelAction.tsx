'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useNumberOfPuzzlesInSet } from '../../../../hooks/fetching/useNumberOfPuzzlesInSet';
import { useContractWriteZKube } from '../../../../hooks/useContractWrite';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
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
  // const [id, setId] = useLocalStorage('puzzleId', '0');
  const params = useParams();
  const id = params?.id;
  const puzzleSet = params?.puzzleSet;
  const { data: puzzlesInSet } = useNumberOfPuzzlesInSet();
  const walletAddress = usePrivyWalletAddress();
  const router = useRouter(); // Add this hook

  useEffect(() => {
    setError(proofError);
  }, [proofError]);

  useEffect(() => {
    setError(submitSolutionError);
  }, [submitSolutionError]);

  const handleNextLevel = () => {
    router.push(`/puzzle/${puzzleSet}/${Number(id) + 1}`);
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
