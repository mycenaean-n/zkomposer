import { useContext, useEffect, useState } from 'react';
import { PuzzleContext } from '../Puzzle';
import { Grid } from './Grid';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { ResponsiveCamera } from './ResponsiveCamera';
import { gridMutator } from 'circuits';
import IntermediateGrids from './IntermediateGrids';

export function Scene() {
  const [grids, setGrids] = useState<number[][][]>([]);
  const { initConfig, functions } = useContext(PuzzleContext);
  const {
    initialGrid: startingGrid,
    finalGrid,
    availableFunctions,
  } = initConfig;

  const xGap = 5 / (availableFunctions.length + 1);
  let xPos = -2.5;
  const gridElements = grids.map((grid, index) => {
    xPos += xGap;
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: -0.5, z: 0 }} />
    );
  });

  useEffect(() => {
    setGrids([]);
    const mutatedGrids: number[][][] = [];
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
    <div className="flex" style={{ height: '600px' }}>
      <div className="flex-1">
        <Canvas
          orthographic
          camera={{
            position: new Vector3(2, 2, 4),
            left: -50,
            right: 50,
            top: 10,
            bottom: -10,
            zoom: 60,
            near: -10,
            far: 1000,
          }}
        >
          <ambientLight intensity={Math.PI} />
          <Grid grid={startingGrid} position={{ x: -2.5, y: -0.5, z: 0 }} />
          <IntermediateGrids {...{ grids, availableFunctions }} />
          <ResponsiveCamera />
        </Canvas>
      </div>
      <div className="flex-2">
        <h3 className="b text-xl mt-8">Goal:</h3>
        <Canvas
          orthographic
          camera={{
            position: new Vector3(2, 2, 4),
            zoom: 40,
          }}
        >
          <Grid grid={finalGrid} position={{ x: 0.4, y: 1, z: 0 }} />
          <ResponsiveCamera />
        </Canvas>
      </div>
    </div>
  );
}
