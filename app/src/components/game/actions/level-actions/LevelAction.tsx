'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProof } from '../../../../context/ProofContext';
import { usePuzzleContext } from '../../../../context/PuzzleContext';
import { useAuthAndUserState } from '../../../../hooks/level-actions/useAuthAndUseState';
import { useContractInteractions } from '../../../../hooks/level-actions/useContractInteractions';
import { usePrivyLogin } from '../../../../hooks/privy/usePrivyLogin';
import { useRouteParams } from '../../../../hooks/useRouteChange';
import { composePuzzleRoute } from '../../../../utils/composePuzzleRoute';
import { hasSubmittedPuzzle } from '../../../../utils/hasSubmittedPuzzle';
import { ActionButton } from './ActionButton';
import { LevelModal } from './LevelModal';

export function LevelAction() {
  const { id, puzzleSet } = useRouteParams();
  const {
    error,
    loading,
    generateAndVerifyProof,
    proofCalldata,
    nullifyProofCalldata,
  } = useProof();
  const { submitSolution, puzzlesInSet, isConfirming } =
    useContractInteractions();
  const { address, user } = useAuthAndUserState(puzzleSet);
  const hasUserSubmittedPuzzle = hasSubmittedPuzzle(user, id);
  const isLastInSet = Number(puzzlesInSet) === Number(id) + 1;
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const { isSolved } = usePuzzleContext();
  const router = useRouter();

  const handleNextLevel = () => {
    if (!puzzleSet) return;

    if (isFirstClick) {
      setIsOpen(true);
      setIsFirstClick(false);
      return;
    }

    const newId = String(Number(id) + 1);
    nullifyProofCalldata();
    router.push(composePuzzleRoute(puzzleSet, newId));
    setIsOpen(false);
  };

  const handleProofGeneration = async () => {
    const proofCalldata = await generateAndVerifyProof();
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
      {isSolved && !loading && (
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
      {loading && <LoadingState message="Generating Proof" icon="⚙️" />}
      {error && !loading && !proofCalldata && <ErrorMessage error={error} />}
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
