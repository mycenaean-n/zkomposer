'use client';
import { createContext, memo, useEffect, useState } from 'react';
import { Actions } from './Actions';
import {
  PuzzleFunctions,
  PuzzleContext as PuzzleContextType,
  Puzzle,
} from '@/src/types/Puzzle';
import { Scene } from './Scene';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
  functions: { remaining: [], chosen: [] },
  setFunctions: () => {},
});

function Puzzle({initConfig, gameId}: {initConfig: Puzzle, gameId: string}) {
  const [functions, setFunctions] = useState<PuzzleFunctions>({
    remaining: initConfig.availableFunctions,
    chosen: [],
  });

  useEffect(() => {
      setFunctions({
        remaining: initConfig.availableFunctions,
        chosen: [],
      });
  }, [initConfig])

  return (
    <PuzzleContext.Provider
      value={{
        initConfig,
        functions,
        setFunctions,
      }}
    >
      <div className="flex flex-col flex-grow w-full h-full">
        <Scene />
        <Actions gameId={gameId}/>
      </div>
    </PuzzleContext.Provider>
  );
}

export const PuzzleMemoized = memo(Puzzle);