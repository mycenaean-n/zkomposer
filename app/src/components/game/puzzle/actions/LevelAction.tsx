'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useSubmitSolutionCallback } from '../../../../hooks/callbacks/useSubmitSolutionCallback';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { GameMode } from '../../../../types/Game';
import { ZKProofCalldata } from '../../../../types/Proof';
import { Button } from '../../../ui/Button';

type LevelActionProps = {
  proofCalldata: ZKProofCalldata | null;
  id: string;
  gameMode: GameMode;
  error: Error | null;
};

export function LevelAction({
  proofCalldata,
  id,
  error: proofError,
}: LevelActionProps) {
  const [error, setError] = useState<Error | null>(null);
  const { callback: submitSolution, error: submitSolutionError } =
    useSubmitSolutionCallback();

  useEffect(() => {
    setError(proofError);
  }, [proofError]);

  useEffect(() => {
    setError(submitSolutionError);
  }, [submitSolutionError]);

  const router = useRouter();
  const handleNextLevel = () => {
    router.push(`/puzzle/${Number(id) + 1}`);
  };
  const walletAddress = usePrivyWalletAddress();
  const { login } = usePrivy();

  const onClick = async () => {
    if (!walletAddress) {
      login();
    } else {
      submitSolution({
        puzzleSet: ZKUBE_PUZZLESET_ADDRESS,
        puzzleId: BigInt(id),
        proof: proofCalldata,
      });
    }
  };

  return (
    <div className="absolute bottom-20 right-0 grid grid-cols-2 gap-2">
      {proofCalldata ? (
        <>
          <div className="col-span-full flex items-center justify-center gap-2">
            <h1 className="text-[1.5rem]">🎉 Puzzle Solved 🎉</h1>
          </div>
          <Button
            onClick={onClick}
            variant="secondary"
            className="min-h-9 w-full border border-black text-sm md:text-base"
            type="button"
            rounded
          >
            Submit
          </Button>
          <Button
            onClick={handleNextLevel}
            variant="primary"
            className="min-h-9 w-full text-sm md:text-base"
            type="button"
            rounded
          >
            Next Level
          </Button>
        </>
      ) : (
        <div className="col-span-full flex items-center justify-center gap-2">
          {error ? <h1 className="text-[1.5rem]">{error?.message}</h1> : null}
        </div>
      )}
    </div>
  );
}
