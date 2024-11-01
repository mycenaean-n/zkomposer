import clsx from 'clsx';
import { useContext } from 'react';
import { GameMode } from 'types/Game';
import { GenerateProof } from '../../../zk/generateProof';
import { PuzzleContext } from '../Puzzle';
import { DragAndDrop } from './DragAndDrop';

type ActionsProps = {
  gameMode: GameMode;
  className: string;
};

export function Actions({ gameMode, className }: ActionsProps) {
  const { functions, setFunctions } = useContext(PuzzleContext);

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
