'use client';
import { useCallback, useState } from 'react';
import { Actions } from '../../src/components/game/actions/Actions';
import { PuzzleLayout } from '../../src/components/game/layout/Layout';
import { Scene } from '../../src/components/game/scene/Scene';
import { Sidepanel } from '../../src/components/game/sidepanel/Sidepanel';
import { LoadingState } from '../../src/components/ui/loader/LoadingState';
import { usePuzzleContext } from '../../src/context/PuzzleContext';

export default function Page() {
  const { initConfig, functions } = usePuzzleContext();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const isPuzzleReady = !!(initConfig && functions);

  const closeLeaderboard = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsLeaderboardOpen(false);
    }
  }, [setIsLeaderboardOpen]);

  return (
    <section className="flex flex-col">
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
    </section>
  );
}
