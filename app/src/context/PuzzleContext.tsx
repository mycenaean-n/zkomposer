'use client';
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
};

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: undefined,
  functions: undefined,
  setFunctions: () => {},
  isSolved: false,
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

export function PuzzleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useRouteParams();
  const initConfig = usePuzzleData(id ?? '');
  const [functions, setFunctions] = useState<PuzzleFunctions | undefined>(
    functionInitializer(initConfig)
  );

  useEffect(() => {
    setFunctions(functionInitializer(initConfig));
  }, [initConfig]);

  const isSolved = useMemo(() => {
    const targetGrid = gridMutator(initConfig?.initialGrid ?? [], [
      ...(functions?.chosen ?? []),
    ]);

    return JSON.stringify(targetGrid) === JSON.stringify(initConfig?.finalGrid);
  }, [functions, initConfig]);

  return (
    <PuzzleContext.Provider
      value={{ initConfig, functions, setFunctions, isSolved }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzleContext() {
  return useContext(PuzzleContext);
}
