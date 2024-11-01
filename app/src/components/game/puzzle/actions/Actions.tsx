import { useContext } from 'react';
import { GameMode } from 'types/Game';
import { GenerateProof } from '../../../zk/generateProof';
import { PuzzleContext } from '../Puzzle';
import { DragAndDrop } from './DragAndDrop';

export function Actions({ gameMode }: { gameMode: GameMode }) {
  const { functions, setFunctions } = useContext(PuzzleContext);

  const areFunctionsDefined =
    functions?.remaining &&
    functions?.chosen &&
    functions?.available &&
    setFunctions;

  return (
    <div className="flex h-auto flex-col">
      <GenerateProof {...{ gameMode, functions }} />
      {areFunctionsDefined ? (
        <DragAndDrop functions={functions!} setFunctions={setFunctions!} />
      ) : null}
    </div>
  );
}
