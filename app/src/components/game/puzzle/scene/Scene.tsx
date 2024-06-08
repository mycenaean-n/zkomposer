import { useContext, useEffect, useState } from 'react';
import { PuzzleContext } from '../Puzzle';
import { Grid } from './grid/Grid';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { ResponsiveCamera } from './ResponsiveCamera';
import { gridMutator } from 'circuits';
import IntermediateGrids from './IntermediateGrids';
import { Colors } from 'circuits/types/circuitFunctions.types';
import { isMobile } from 'react-device-detect';

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
      if (index == 0) {
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
    <div className="flex" style={{ height: isMobile ? '280px' : '500px' }}>
      <div className="w-2/3">
        <Canvas
          orthographic
          camera={{
            position: new Vector3(3.5, 4, 3),
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
      <div className="overflow-hidden">
        <h3 className="w-1/3 text-2xl font-extrabold md:mt-12">Target</h3>
        <Canvas
          orthographic
          camera={{
            position: new Vector3(3.5, 4, 3),
          }}
        >
          <Grid grid={finalGrid} position={{ x: 0, y: 1.8, z: 0 }} />
          <ResponsiveCamera />
        </Canvas>
      </div>
    </div>
  );
}
