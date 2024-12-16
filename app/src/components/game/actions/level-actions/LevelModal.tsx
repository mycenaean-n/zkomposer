import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../../../ui/Modal';
import { ActionButton } from './ActionButton';

type LevelModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  isLastInSet: boolean;
  handleNextLevel: () => void;
  hasUserSubmittedPuzzle: boolean | undefined;
};

export function LevelModal({
  setIsOpen,
  onClick,
  isLastInSet,
  handleNextLevel,
  hasUserSubmittedPuzzle,
}: LevelModalProps) {
  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="flex w-72 flex-col gap-3 text-black">
        <div className="flex items-center justify-center">
          <h1 className="text-lg">Warning ‼️</h1>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          If you want to appear on the leaderboard, you must submit your
          solution.
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <ActionButton
            onClick={onClick}
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
  );
}
