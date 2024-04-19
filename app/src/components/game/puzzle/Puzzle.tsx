'use client';
import { createContext, memo, useEffect, useState } from 'react';
import { Actions } from './actions/Actions';
import {
  PuzzleFunctions,
  PuzzleContext as PuzzleContextType,
  Puzzle as PuzzleType,
} from '@/src/types/Puzzle';
import { Scene } from './scene/Scene';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
  functions: { remaining: [], chosen: [], available: [] },
  setFunctions: () => {},
  puzzleSolved: false,
  setPuzzleSolved: () => {},
});

function Puzzle({
  initConfig,
  gameId,
  puzzleId,
}: {
  initConfig: PuzzleType;
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

  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);

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
        puzzleSolved,
        setPuzzleSolved,
      }}
    >
      <div
        className="flex flex-col flex-grow w-full"
        style={{ height: '800px' }}
      >
        <Scene />
        <Actions gameId={gameId} puzzleId={puzzleId} />
      </div>
    </PuzzleContext.Provider>
  );
}

export const PuzzleMemoized = memo(Puzzle);
