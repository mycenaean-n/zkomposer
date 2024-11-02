'use client';
import { createContext, useEffect, useState } from 'react';
import {
  PuzzleContext as PuzzleContextType,
  PuzzleFunctions,
} from 'types/Puzzle';
import { usePuzzleData } from '../../../hooks/usePuzzleData';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { LoadingState } from '../../ui/loader/LoadingState';
import { Actions } from './actions/Actions';
import { PuzzleLayout } from './layout/Layout';
import { Scene } from './scene/Scene';
import { Sidepanel } from './sidepanel/Sidepanel';

export const PuzzleContext = createContext<PuzzleContextType>({
  initConfig: undefined,
  functions: undefined,
  setFunctions: () => {},
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

export function Puzzle() {
  const { id } = useRouteParams();
  const initConfig = usePuzzleData(id ?? '');
  const [functions, setFunctions] = useState<PuzzleFunctions | undefined>(
    functionInitializer(initConfig)
  );

  useEffect(() => {
    setFunctions(functionInitializer(initConfig));
  }, [initConfig]);

  const isPuzzleReady = !!(initConfig && functions);

  return (
    <PuzzleContext.Provider
      value={{
        initConfig,
        functions,
        setFunctions,
      }}
    >
      {isPuzzleReady ? (
        <PuzzleLayout
          scene={({ className }) => (
            <Scene
              initConfig={initConfig}
              functions={functions}
              className={className}
            />
          )}
          actions={({ className }) => (
            <Actions gameMode="singleplayer" className={className} />
          )}
          stats={({ className }) => <Sidepanel className={className} />}
        />
      ) : (
        <LoadingState />
      )}
    </PuzzleContext.Provider>
  );
}
