'use client';
import { PuzzleMemoized } from './puzzle/Puzzle';
import { useFetchPuzzleByPuzzleId } from '../../hooks/usePuzzleData';

export function SinglePlayerGame({ id }: { id: string }) {
  const puzzleData = useFetchPuzzleByPuzzleId(id);

  const style =
    'flex flex-grow justify-center items-center text-align-center w-screen h-full text-2xl';
  const LoadingState = (text: string) => (
    <div className={style}>
      <h1>{text}</h1>
    </div>
  );

  if (!puzzleData) {
    return LoadingState('Game not found');
  }

  return (
    <>
      {puzzleData && <PuzzleMemoized initConfig={puzzleData} puzzleId={id} />}
    </>
  );
}
