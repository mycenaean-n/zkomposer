'use client';
// import { PuzzleContext as PuzzleContextType } from 'types/Puzzle';
import { usePuzzleContext } from '../../../context/PuzzleContext';
import { LoadingState } from '../../ui/loader/LoadingState';
import { Actions } from './actions/Actions';
import { PuzzleLayout } from './layout/Layout';
import { Scene } from './scene/Scene';
import { Sidepanel } from './sidepanel/Sidepanel';

export function Puzzle() {
  const { initConfig, functions } = usePuzzleContext();

  const isPuzzleReady = !!(initConfig && functions);

  return (
    <>
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
    </>
  );
}
