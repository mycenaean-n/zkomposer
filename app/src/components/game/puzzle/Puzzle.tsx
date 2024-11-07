'use client';
import { useCallback, useState } from 'react';
import { usePuzzleContext } from '../../../context/PuzzleContext';
import { LoadingState } from '../../ui/loader/LoadingState';
import { Actions } from './actions/Actions';
import { PuzzleLayout } from './layout/Layout';
import { Scene } from './scene/Scene';
import { Sidepanel } from './sidepanel/Sidepanel';

export function Puzzle() {
  const { initConfig, functions } = usePuzzleContext();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const isPuzzleReady = !!(initConfig && functions);

  const closeLeaderboard = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsLeaderboardOpen(false);
    }
  }, [setIsLeaderboardOpen]);

  return (
    <>
      {isPuzzleReady ? (
        <PuzzleLayout
          scene={({ className }) => (
            <Scene
              onClick={closeLeaderboard}
              initConfig={initConfig}
              functions={functions}
              className={className}
            />
          )}
          actions={({ className }) => (
            <Actions
              onClick={closeLeaderboard}
              gameMode="singleplayer"
              className={className}
            />
          )}
          stats={({ className }) => (
            <Sidepanel
              isLeaderboardOpen={isLeaderboardOpen}
              setIsLeaderboardOpen={setIsLeaderboardOpen}
              className={className}
            />
          )}
        />
      ) : (
        <LoadingState />
      )}
    </>
  );
}
