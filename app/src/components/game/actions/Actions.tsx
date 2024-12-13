import clsx from 'clsx';
import { GameMode } from 'types/Game';
import { usePuzzleContext } from '../../../context/PuzzleContext';
import { GenerateProof } from '../../zk/generateProof';
import { DragAndDrop } from './DragAndDrop';

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
    <div className={clsx('flex h-auto flex-col', className)} {...props}>
      <GenerateProof />
      {areFunctionsDefined ? (
        <DragAndDrop functions={functions!} setFunctions={setFunctions!} />
      ) : null}
    </div>
  );
}
