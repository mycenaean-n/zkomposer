'use client';
import { useLogin } from '@privy-io/react-auth';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useProof } from '../../../context/ProofContext';
import { useContractWriteZKube } from '../../../hooks/useContractWrite';
import { usePrivyWalletAddress } from '../../../hooks/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../../../hooks/useReadContract';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { useUserPuzzlesSolved } from '../../../hooks/useUserPuzzlesSolved';
import { ZKProofCalldata } from '../../../types/Proof';
import { composePuzzleRoute } from '../../../utils/composePuzzleRoute';
import { hasSubmittedPuzzle } from '../../../utils/hasSubmittedPuzzle';
import { Button } from '../../ui/Button';
import { Spinner } from '../../ui/Spinner';
import { useProofGeneration } from '../../zk/hooks/useProofGeneration';

type LevelActionProps = {
  error: Error | null;
};

type SuccessMessageProps = {
  message: string;
};

function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="col-span-full flex items-center justify-center gap-2">
      <h1 className="text-lg">{message}</h1>
    </div>
  );
}

type ActionButtonProps = {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ActionButton({
  onClick,
  variant,
  fullWidth,
  children,
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={clsx(
        'min-h-6 w-full border border-black text-sm',
        fullWidth && 'col-span-full'
      )}
      type="button"
      rounded
    >
      {children}
    </Button>
  );
}

type ErrorMessageProps = {
  error: Error;
};

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="col-span-full">
      <h1 className="text-lg">{error.message.slice(0, 50)}</h1>
    </div>
  );
}

export function LevelAction() {
  const [error, setError] = useState<Error | null>(null);
  const { callback: submitSolution, error: submitSolutionError } =
    useContractWriteZKube('submitSolution');
  const { data: puzzlesInSet } = useReadContractPuzzleSet('numberOfPuzzles');
  const address = usePrivyWalletAddress();
  const { id, puzzleSet } = useRouteParams();
  const { generateAndVerifyProof, loading } = useProofGeneration();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const { login } = useLogin({
    onComplete: async () => {
      const proofCalldata = await generateAndVerifyProof();
      if (!puzzleSet || !id) return;
      console.log(hasSubmittedPuzzle(user, id));
      if (hasSubmittedPuzzle(user, id)) return;
      submitSolution([puzzleSet, BigInt(id as string), proofCalldata]);
    },
  });
  const { nullifyProofCalldata, proofCalldata, error: proofError } = useProof();
  const router = useRouter();
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
    if (!puzzleSet) return;
    const newId = String(Number(id) + 1);
    nullifyProofCalldata();
    router.push(composePuzzleRoute(puzzleSet, newId));
  };

  const onClick = async (proofCd: ZKProofCalldata) => {
    if (!address) {
      login();
    } else {
      if (!puzzleSet) return;
      submitSolution([puzzleSet, BigInt(id as string), proofCd]);
    }
  };

  return (
    <div className="absolute bottom-14 right-4 grid grid-cols-2 gap-2">
      {!error && proofCalldata && (
        <>
          <SuccessMessage message="🎉 Puzzle Solved 🎉" />
          {!hasUserSubmittedPuzzle && (
            <ActionButton
              onClick={() => onClick(proofCalldata)}
              variant="secondary"
              fullWidth={isLastInSet}
            >
              Submit
            </ActionButton>
          )}
          {!isLastInSet && (
            <ActionButton
              onClick={handleNextLevel}
              variant="primary"
              fullWidth={hasUserSubmittedPuzzle}
            >
              Next Level
            </ActionButton>
          )}
        </>
      )}
      {loading && (
        <div className="col-span-full flex items-center justify-center gap-2">
          <Spinner isPrimary={false} />
          <h1 className="text-lg">Submitting ⚙️</h1>
        </div>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
