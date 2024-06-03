'use client';
import { createContext, memo, useEffect, useState } from 'react';
import { Actions } from './actions/Actions';
import {
  PuzzleFunctions,
  PuzzleContext as PuzzleContextType,
  Puzzle as PuzzleType,
} from 'types/Puzzle';
import { Scene } from './scene/Scene';

type GameMode = 'singleplayer' | 'multiplayer';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
  functions: { remaining: [], chosen: [], available: [] },
  setFunctions: () => {},
});

function Puzzle({
  initConfig,
  id,
  gameMode,
}: {
  initConfig: PuzzleType;
  id: string;
  gameMode: GameMode;
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
  }, [initConfig, id]);

  return (
    <PuzzleContext.Provider
      value={{
        initConfig,
        functions,
        setFunctions,
      }}
    >
      <div className="md:w-1000 md:h-800 m-auto flex flex-grow flex-col">
        <Scene />
        <Actions {...{ id, gameMode }} />
      </div>
    </PuzzleContext.Provider>
  );
}

export const PuzzleMemoized = memo(Puzzle);
