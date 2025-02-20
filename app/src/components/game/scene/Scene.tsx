'use client';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { Vector3 } from 'three';
import { useLeaderboard } from '../../../providers/LeaderboardProvider';
import { usePuzzleContext } from '../../../providers/PuzzleProvider';
import { Skeleton } from '../../ui/skeleton/Skeleton';
import { Grid } from './grid/Grid';
import IntermediateGrids from './IntermediateGrids';
import { ResponsiveCamera } from './ResponsiveCamera';

const STARTING_X_POS = isMobile ? -0.7 : -1.5;
const STARTING_Y_POS = isMobile ? 0.3 : 0.5;

type SceneProps = {
  className: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Scene({ className, ...props }: SceneProps) {
  const { initConfig, grids } = usePuzzleContext();
  const { closeLeaderboard } = useLeaderboard();

  if (!initConfig || !grids) {
    return <Skeleton className={className} />;
  }

  return (
    <div
      onClick={closeLeaderboard}
      className={clsx('grid grid-cols-[3fr_1fr] gap-2', className)}
      {...props}
    >
      <Canvas
        orthographic
        camera={{
          position: new Vector3(2.5, 3, 3),
        }}
      >
        <ambientLight intensity={Math.PI} />
        {initConfig && (
          <>
            <Grid
              grid={initConfig.initialGrid}
              position={{ x: STARTING_X_POS, y: STARTING_Y_POS, z: 0 }}
            />
            <IntermediateGrids
              grids={grids}
              availableFunctions={initConfig.availableFunctions}
              xPos={STARTING_X_POS}
              yPos={STARTING_Y_POS}
            />
          </>
        )}
        <ResponsiveCamera />
      </Canvas>
      <div className="relative overflow-hidden">
        <h2 className="absolute left-0 text-lg font-semibold text-black">
          Target
        </h2>
        <Canvas
          orthographic
          camera={{
            position: new Vector3(2.5, 3, 3),
          }}
        >
          {initConfig && (
            <Grid
              grid={initConfig?.finalGrid}
              position={{ x: 0.7, y: 1.5, z: 0.8 }}
            />
          )}
          <ResponsiveCamera />
        </Canvas>
      </div>
    </div>
  );
}
