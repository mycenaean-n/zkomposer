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
  console.log({ puzzleSolved });

  return (
    <div className="flex flex-col">
      {puzzleSolved && (
        <>
          <div className="absolute bottom-10 right-0 flex">
            <Tick />
            <h2 className="text-sm md:text-base">Puzzle Solved</h2>
          </div>
          {gameMode === 'singleplayer' && (
            <Link href={`/puzzle/${Number(id) + 1}`}>
              <Button
                variant="primary"
                className="min-h-9 w-full text-sm md:text-base"
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
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
