'use client';
import { createContext, memo, useEffect, useState } from 'react';
import { Actions } from './actions/Actions';
import {
  PuzzleFunctions,
  PuzzleContext as PuzzleContextType,
  Puzzle as PuzzleType,
} from '@/src/types/Puzzle';
import { Scene } from './scene/Scene';

type GameMode = 'singleplayer' | 'multiplayer';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
  functions: { remaining: [], chosen: [], available: [] },
  setFunctions: () => {},
});

function Puzzle({
  initConfig,
  gameId,
  puzzleId,
  gameMode,
}: {
  initConfig: PuzzleType;
  gameMode: GameMode;
  gameId?: string;
  puzzleId?: string;
}) {
  const [functions, setFunctions] = useState<PuzzleFunctions>({
    remaining: initConfig.availableFunctions.filter(
      (funcName) => funcName !== 'EMPTY'
    ),
    chosen: [],
    available: initConfig.availableFunctions,
  });

  useEffect(() => {
    setFunctions({
      remaining: initConfig.availableFunctions.filter(
        (funcName) => funcName !== 'EMPTY'
      ),
      chosen: [],
      available: initConfig.availableFunctions,
    });
  }, [initConfig, gameId, puzzleId]);

  return (
    <PuzzleContext.Provider
      value={{
        initConfig,
        functions,
        setFunctions,
      }}
    >
      <div className="flex flex-col flex-grow  m-auto md:w-1000 md:h-800">
        <Scene />
        <Actions gameId={gameId} puzzleId={puzzleId} />
      </div>
    </PuzzleContext.Provider>
  );
}

export const PuzzleMemoized = memo(Puzzle);
