'use client';
import Link from 'next/link';
import { GameMode } from '../../../../types/Game';
import { Button } from '../../../ui/Button';

type LevelActionProps = {
  proofGenerationError?: string;
  puzzleSolved: boolean;
  id: string;
  gameMode: GameMode;
};

export function LevelAction({
  proofGenerationError,
  puzzleSolved,
  id,
  gameMode,
}: LevelActionProps) {
  return (
    <div className="absolute -top-24 right-2 flex flex-col md:-top-32 md:right-14">
      {proofGenerationError && (
        <h2 className="mt-2 text-sm md:text-2xl">{proofGenerationError}</h2>
      )}
      {puzzleSolved && (
        <>
          <div className="flex">
            <Tick />
            Link
            <h2 className="mt-2 text-sm md:text-2xl">Puzzle Solved</h2>
          </div>
          {gameMode === 'singleplayer' && (
            <Link href={`/puzzle/${Number(id) + 1}`}>
              <Button
                variant="primary"
                className="mt-2"
                rounded={true}
                type="button"
              >
                Next Level
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

function Tick() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
