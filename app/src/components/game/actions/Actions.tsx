import clsx from 'clsx';
import { GameMode } from 'types/Game';
import { DragAndDrop } from './DragAndDrop';
import { LevelAction } from './level-actions/LevelAction';

type ActionsProps = {
  gameMode: GameMode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Actions({ gameMode, className, ...props }: ActionsProps) {
  return (
    <div
      className={clsx('relative flex h-auto flex-col', className)}
      {...props}
    >
      <LevelAction />
      <DragAndDrop />
    </div>
  );
}
