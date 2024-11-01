import { Canvas } from '@react-three/fiber';
import { gridMutator } from 'circuits';
import { Colors } from 'circuits/types/circuitFunctions.types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Vector3 } from 'three';
import { Puzzle, PuzzleFunctions } from '../../../../types/Puzzle';
import { Grid } from './grid/Grid';
import IntermediateGrids from './IntermediateGrids';
import { ResponsiveCamera } from './ResponsiveCamera';

const STARTING_X_POS = isMobile ? -0.7 : -1.5;
const STARTING_Y_POS = isMobile ? 0.3 : 0.5;

type SceneProps = {
  initConfig: Puzzle;
  functions: PuzzleFunctions;
  className: string;
};

export function Scene({ initConfig, functions, className }: SceneProps) {
  const [grids, setGrids] = useState<Colors[][][]>([]);

  const {
    initialGrid: startingGrid,
    finalGrid,
    availableFunctions,
  } = initConfig;

  useEffect(() => {
    // setGrids([]);
    const mutatedGrids: Colors[][][] = [];
    if (functions.chosen && startingGrid) {
      functions.chosen.forEach((funcName, index) => {
        if (index === 0) {
          const grid = gridMutator(startingGrid, [funcName]);
          mutatedGrids.push(grid);
        } else {
          const grid = gridMutator(mutatedGrids[index - 1], [funcName]);
          mutatedGrids.push(grid);
        }
      });
    }
    setGrids(mutatedGrids);
  }, [functions]);

  console.log(
    { startingGrid, finalGrid, availableFunctions },
    grids.length > 0 && availableFunctions
  );

  return (
    <div
      className={clsx('grid h-[350px] grid-cols-[3fr_1fr] gap-2', className)}
    >
      <Canvas
        orthographic
        camera={{
          position: new Vector3(2.5, 3, 3),
        }}
      >
        <ambientLight intensity={Math.PI} />
        {startingGrid ? (
          <Grid
            grid={startingGrid}
            position={{ x: STARTING_X_POS, y: STARTING_Y_POS, z: 0 }}
          />
        ) : null}
        {grids.length > 0 && availableFunctions ? (
          <IntermediateGrids
            grids={grids}
            availableFunctions={availableFunctions}
            xPos={STARTING_X_POS}
            yPos={STARTING_Y_POS}
          />
        ) : null}
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
          <Grid grid={finalGrid} position={{ x: 0.5, y: 1.2, z: 0.8 }} />
          <ResponsiveCamera />
        </Canvas>
      </div>
    </div>
  );
}
