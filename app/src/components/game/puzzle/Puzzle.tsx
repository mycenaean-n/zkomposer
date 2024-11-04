'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { usePuzzleContext } from '../../../context/PuzzleContext';
import { ArrowLeft } from '../../ui/icons/ArrowLeft';
import { ArrowRight } from '../../ui/icons/ArrowRight';
import { LoadingState } from '../../ui/loader/LoadingState';
import { Actions } from './actions/Actions';
import { PuzzleLayout } from './layout/Layout';
import { Scene } from './scene/Scene';
import { Sidepanel } from './sidepanel/Sidepanel';

export function Puzzle() {
  const { initConfig, functions } = usePuzzleContext();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const isPuzzleReady = !!(initConfig && functions);

  return (
    <>
      {isPuzzleReady ? (
        <PuzzleLayout
          scene={({ className }) => (
            <Scene
              onClick={() => setIsLeaderboardOpen(false)}
              initConfig={initConfig}
              functions={functions}
              className={className}
            />
          )}
          actions={({ className }) => (
            <Actions
              onClick={() => setIsLeaderboardOpen(false)}
              gameMode="singleplayer"
              className={className}
            />
          )}
          stats={({ className }) => (
            <div
              className={clsx(
                'absolute right-0 top-0 flex h-full gap-2 bg-white px-2 shadow-xl transition-all duration-700 ease-in-out',
                isLeaderboardOpen ? 'w-[22rem] lg:relative' : 'w-8',
                className
              )}
            >
              <button
                type="button"
                onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
                className="w-8"
              >
                {isLeaderboardOpen ? <ArrowRight /> : <ArrowLeft />}
              </button>
              <Sidepanel className={className} />
            </div>
          )}
        />
      ) : (
        <LoadingState />
      )}
    </>
  );
}
