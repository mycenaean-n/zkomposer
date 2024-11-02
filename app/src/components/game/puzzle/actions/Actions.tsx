import clsx from 'clsx';
import { GameMode } from 'types/Game';
import { usePuzzleContext } from '../../../../context/PuzzleContext';
import { GenerateProof } from '../../../zk/generateProof';
import { DragAndDrop } from './DragAndDrop';

type ActionsProps = {
  gameMode: GameMode;
  className: string;
};

export function Actions({ gameMode, className }: ActionsProps) {
  const { functions, setFunctions } = usePuzzleContext();

  const areFunctionsDefined =
    functions?.remaining &&
    functions?.chosen &&
    functions?.available &&
    setFunctions;

  return (
    <div className={clsx('flex h-auto flex-col', className)}>
      <GenerateProof {...{ gameMode, functions }} />
      {areFunctionsDefined ? (
        <DragAndDrop functions={functions!} setFunctions={setFunctions!} />
      ) : null}
    </div>
  );
}
