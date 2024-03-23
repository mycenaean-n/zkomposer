'use client';
import { createContext, useState } from 'react';
import { Actions } from './Actions';
import {
  PuzzleFunctions,
  PuzzleContext as PuzzleContextType,
  PuzzleInit,
} from '@/src/types/Puzzle';
import { Scene } from './Scene';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
  functions: { remaining: [], chosen: [] },
  setFunctions: () => {},
});

export function Puzzle(initConfig: PuzzleInit) {
  const [functions, setFunctions] = useState<PuzzleFunctions>({
    remaining: initConfig.availableFunctions,
    chosen: [],
  });

  return (
    <PuzzleContext.Provider
      value={{
        initConfig,
        functions,
        setFunctions
      }}
    >
      <div className="flex flex-col flex-grow w-full h-full">
        <Scene />
        <Actions />
      </div>
    </PuzzleContext.Provider>
  );
}
