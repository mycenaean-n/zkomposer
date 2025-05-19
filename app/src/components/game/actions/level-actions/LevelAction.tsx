'use client';
import {
  useContractInteractions,
  useGenerateProof,
  usePrivyLogin,
  usePrivyWalletAddress,
  useRouteParams,
  useUserPuzzlesSolved,
} from '@/hooks';
import { composePuzzleRoute, hasSubmittedPuzzle } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePuzzleContext } from '../../../../providers/PuzzleProvider';
import { ActionButton } from './ActionButton';
import { LevelModal } from './LevelModal';

export function LevelAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const router = useRouter();
  const { id, puzzleSet } = useRouteParams();
  const { isSolved } = usePuzzleContext();
  const { submitSolution, puzzlesInSet, isConfirming } =
    useContractInteractions();
  const { mutateAsync: generateProof, isPending, error } = useGenerateProof();
  const { address } = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });

  useEffect(() => {
    setIsOpen(false);
  }, [id, puzzleSet]);

  const hasUserSubmittedPuzzle = hasSubmittedPuzzle(user, id);
  const isLastInSet = Number(puzzlesInSet) === Number(id) + 1;

  const handleNextLevel = () => {
    if (!puzzleSet) return;

    if (isFirstClick) {
      setIsOpen(true);
      setIsFirstClick(false);
      return;
    }

    const newId = String(Number(id) + 1);
    router.push(composePuzzleRoute(puzzleSet, newId));
    setIsOpen(false);
  };

  const handleProofGeneration = async () => {
    const proofCalldata = await generateProof(undefined);
    if (!puzzleSet || !id || !proofCalldata || hasUserSubmittedPuzzle) {
      return;
    }
    await submitSolution([puzzleSet, BigInt(id as string), proofCalldata]);
  };

  const { login } = usePrivyLogin(() => {
    if (!address || !isSolved) return;
    handleProofGeneration();
  });

  const onClick = async () => {
    if (!address) {
      login();
    } else {
      handleProofGeneration();
    }
  };

  return (
    <div className="absolute right-4 top-[-80px] grid grid-cols-2 gap-2">
      {isSolved && !isPending && (
        <>
          <SuccessMessage message="🎉 Puzzle Solved 🎉" />
          {!hasUserSubmittedPuzzle && (
            <ActionButton
              onClick={onClick}
              variant="secondary"
              fullWidth={isLastInSet}
              disabled={isConfirming}
            >
              {isConfirming ? 'Syncing' : 'Submit'}
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
      {isOpen && (
        <LevelModal
          {...{
            setIsOpen,
            onClick,
            isLastInSet,
            handleNextLevel,
            hasUserSubmittedPuzzle,
          }}
        />
      )}
      {isPending && <LoadingState message="Generating Proof" icon="⚙️" />}
      {error && !isPending && <ErrorMessage error={error} />}
    </div>
  );
}

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

type LoadingStateProps = {
  icon: string;
  message: string;
};

function LoadingState({ icon, message }: LoadingStateProps) {
  return (
    <div className="col-span-full flex items-center justify-center gap-2">
      <h1 className="text-lg">
        {message} <span className="inline-block animate-spin">{icon}</span>
      </h1>
    </div>
  );
}
