'use client';
import React from 'react';
import { Tick } from './Actions';
import { useRouter } from 'next/navigation';
import { GameMode } from '../../../../types/Game';

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
  const router = useRouter();

  return (
    <div className="absolute -top-24 right-2 flex flex-col md:-top-32 md:right-14">
      {proofGenerationError && (
        <h2 className="mt-2 text-sm md:text-2xl">{proofGenerationError}</h2>
      )}
      {puzzleSolved && (
        <>
          <div className="flex">
            <Tick />
            <h2 className="mt-2 text-sm md:text-2xl">Puzzle Solved</h2>
          </div>
          {gameMode === 'singleplayer' && (
            <button
              onClick={() => router.push(`/puzzle/${Number(id) + 1}`)}
              className="btn-transparent mt-2"
            >
              Next Level
            </button>
          )}
        </>
      )}
    </div>
  );
}
