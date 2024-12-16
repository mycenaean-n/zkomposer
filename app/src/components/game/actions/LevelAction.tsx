'use client';
import { useLogin } from '@privy-io/react-auth';
import clsx from 'clsx';
import { ButtonHTMLAttributes, useState } from 'react';
import { useAuthAndUserState } from '../../../hooks/level-actions/useAuthAndUseState';
import { useContractInteractions } from '../../../hooks/level-actions/useContractInteractions';
import { useProofSubmission } from '../../../hooks/level-actions/useProofSubmission';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { ZKProofCalldata } from '../../../types/Proof';
import { composePuzzleRoute } from '../../../utils/composePuzzleRoute';
import { hasSubmittedPuzzle } from '../../../utils/hasSubmittedPuzzle';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';

export function LevelAction() {
  const { id, puzzleSet } = useRouteParams();
  const {
    error,
    loading,
    generateAndVerifyProof,
    proofCalldata,
    nullifyProofCalldata,
  } = useProofSubmission();
  const { submitSolution, puzzlesInSet } = useContractInteractions();
  const { address, user, router } = useAuthAndUserState(puzzleSet);
  const hasUserSubmittedPuzzle = hasSubmittedPuzzle(user, id);
  const isLastInSet = Number(puzzlesInSet) === Number(id) + 1;
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

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
  };

  const handleSubmitSolution = async (proofCd: ZKProofCalldata) => {
    if (!puzzleSet) return;
    submitSolution([puzzleSet, BigInt(id as string), proofCd]);
  };

  const { login } = useLogin({
    onComplete: async () => {
      if (!address) return;
      const proofCalldata = await generateAndVerifyProof();
      if (!puzzleSet || !id || !proofCalldata || hasUserSubmittedPuzzle) return;
      handleSubmitSolution(proofCalldata);
    },
  });

  const onClick = async (proofCd: ZKProofCalldata) => {
    if (!address) {
      login();
    } else {
      handleSubmitSolution(proofCd);
    }
  };

  return (
    <div className="absolute bottom-14 right-4 grid grid-cols-2 gap-2">
      {proofCalldata && !loading && (
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
      {isOpen && proofCalldata && (
        <Modal setIsOpen={setIsOpen}>
          <div className="flex w-72 flex-col gap-3 text-black">
            <div className="flex items-center justify-center">
              <h1 className="text-lg">Warning!</h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              If you want to appear on the leaderboard, you must submit your
              solution.
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <ActionButton
                onClick={() => onClick(proofCalldata)}
                variant="secondary"
                fullWidth={isLastInSet}
              >
                Submit
              </ActionButton>
              <ActionButton
                onClick={handleNextLevel}
                variant="primary"
                fullWidth={hasUserSubmittedPuzzle}
              >
                Next Level
              </ActionButton>
            </div>
          </div>
        </Modal>
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
