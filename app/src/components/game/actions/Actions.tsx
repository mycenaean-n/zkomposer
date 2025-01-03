import clsx from 'clsx';
import { GameMode } from 'types/Game';
import { usePuzzleContext } from '../../../context/PuzzleContext';
import { DragAndDrop } from './DragAndDrop';
import { LevelAction } from './level-actions/LevelAction';

type ActionsProps = {
  gameMode: GameMode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Actions({ gameMode, className, ...props }: ActionsProps) {
  const { functions, setFunctions } = usePuzzleContext();

  const areFunctionsDefined =
    functions?.remaining &&
    functions?.chosen &&
    functions?.available &&
    setFunctions;

  return (
    <div
      className={clsx('relative flex h-auto flex-col', className)}
      {...props}
    >
      <LevelAction />
      {areFunctionsDefined ? (
        <DragAndDrop functions={functions!} setFunctions={setFunctions!} />
      ) : null}
    </div>
  );
}
