import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { gridMutator } from 'circuits';
import { Colors } from 'circuits/types/circuitFunctions.types';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Vector3 } from 'three';
import { PuzzleContext } from '../Puzzle';
import { Grid } from './grid/Grid';
import IntermediateGrids from './IntermediateGrids';
import { ResponsiveCamera } from './ResponsiveCamera';

const STARTING_X_POS = isMobile ? -1.7 : -3;
const STARTING_Y_POS = isMobile ? 0.3 : 0.5;

export function Scene() {
  const [grids, setGrids] = useState<number[][][]>([]);
  const { initConfig, functions } = useContext(PuzzleContext);
  const {
    initialGrid: startingGrid,
    finalGrid,
    availableFunctions,
  } = initConfig;

  useEffect(() => {
    setGrids([]);
    const mutatedGrids: Colors[][][] = [];
    functions.chosen.forEach((funcName, index) => {
      if (index === 0) {
        const grid = gridMutator(startingGrid, [funcName]);
        mutatedGrids.push(grid);
      } else {
        const grid = gridMutator(mutatedGrids[index - 1], [funcName]);
        mutatedGrids.push(grid);
      }
    });
    setGrids(mutatedGrids);
  }, [functions]);

  return (
    <div className="flex h-[40vh]">
      <div className="w-2/3">
        <Canvas
          orthographic
          camera={{
            position: new Vector3(2.5, 3, 3),
          }}
        >
          <ambientLight intensity={Math.PI} />
          <Grid
            grid={startingGrid}
            position={{ x: STARTING_X_POS, y: STARTING_Y_POS, z: 0 }}
          />
          <IntermediateGrids
            {...{ grids, availableFunctions }}
            xPos={STARTING_X_POS}
            yPos={STARTING_Y_POS}
          />
          <ResponsiveCamera />
        </Canvas>
      </div>
      <div className="relative overflow-hidden">
        <h2 className="absolute left-0 top-5 text-2xl font-extrabold text-black">
          Target
        </h2>
        <Canvas
          orthographic
          camera={{
            position: new Vector3(2.5, 3, 3),
          }}
        >
          <Html position={[0, 6, 2]} center></Html>
          <Grid grid={finalGrid} position={{ x: 0.5, y: 1.2, z: 0 }} />
          <ResponsiveCamera />
        </Canvas>
      </div>
    </div>
  );
}
