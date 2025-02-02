'use client';
import { Colors } from 'circuits/types/circuitFunctions.types';
import { gridMutator } from 'circuits/utils/transformers/gridMutator';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePuzzleData } from '../hooks/usePuzzleData';
import { useRouteParams } from '../hooks/useRouteChange';
import { Puzzle, PuzzleFunctions } from '../types/Puzzle';

export type PuzzleContextType = {
  initConfig: Puzzle | undefined;
  functions: PuzzleFunctions | undefined;
  setFunctions: Dispatch<SetStateAction<PuzzleFunctions | undefined>>;
  isSolved: boolean;
  grids: Colors[][][];
};

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: undefined,
  functions: undefined,
  setFunctions: () => {},
  isSolved: false,
  grids: [],
});

const functionInitializer = (
  initConfig: ReturnType<typeof usePuzzleData>
): PuzzleFunctions | undefined => {
  if (!initConfig?.availableFunctions?.length || !initConfig.initialGrid) {
    return undefined;
  }

  const availableFunctions = initConfig.availableFunctions;
  const remainingFunctions = availableFunctions.filter(
    (funcName: string) => funcName !== 'EMPTY'
  );

  return {
    remaining: remainingFunctions,
    chosen: [],
    available: availableFunctions,
  };
};

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const { id } = useRouteParams();
  const initConfig = usePuzzleData(id ?? '');
  const [functions, setFunctions] = useState<PuzzleFunctions | undefined>(
    functionInitializer(initConfig)
  );
  const [grids, setGrids] = useState<Colors[][][]>([]);

  useEffect(() => {
    setFunctions(functionInitializer(initConfig));
  }, [initConfig]);

  useEffect(() => {
    const mutatedGrids: Colors[][][] = [];
    if (functions?.chosen && initConfig?.initialGrid) {
      functions.chosen.forEach((funcName, index) => {
        if (index === 0) {
          const grid = gridMutator(initConfig?.initialGrid, [funcName]);
          mutatedGrids.push(grid);
        } else {
          const grid = gridMutator(mutatedGrids[index - 1], [funcName]);
          mutatedGrids.push(grid);
        }
      });
    }
    setGrids(mutatedGrids);
  }, [functions, initConfig]);

  const isSolved = useMemo(() => {
    const targetGrid = gridMutator(initConfig?.initialGrid ?? [], [
      ...(functions?.chosen ?? []),
    ]);

    return JSON.stringify(targetGrid) === JSON.stringify(initConfig?.finalGrid);
  }, [functions, initConfig]);

  const value = {
    initConfig,
    functions,
    setFunctions,
    isSolved,
    grids,
  };

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
}

export function usePuzzleContext() {
  return useContext(PuzzleContext);
}
