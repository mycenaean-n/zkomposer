import { useContext } from 'react';
import { GameMode } from 'types/Game';
import { GenerateProof } from '../../../zk/generateProof';
import { PuzzleContext } from '../Puzzle';
import DragAndDrop from './DragAndDrop';

export function Actions({ id, gameMode }: { id: string; gameMode: GameMode }) {
  const { functions, setFunctions } = useContext(PuzzleContext);

  return (
    <div className="flex flex-col px-2">
      <GenerateProof {...{ id, gameMode, functions }} />
      <DragAndDrop {...{ functions, setFunctions }} />
    </div>
  );
}
