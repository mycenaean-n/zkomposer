import {
  CircuitFunctions,
  Colors,
} from 'circuits/types/circuitFunctions.types';
import { isMobile } from 'react-device-detect';
import { BlackHole } from './grid/BlackHole';
import { Grid } from './grid/Grid';

export default function IntermediateGrids({
  grids,
  availableFunctions,
  xPos,
  yPos,
}: {
  grids: Colors[][][];
  availableFunctions: CircuitFunctions[];
  xPos: number;
  yPos: number;
}) {
  const xGap = isMobile
    ? 8 / availableFunctions.length
    : 5 / availableFunctions.length;

  return grids.map((grid, index) => {
    xPos += xGap;

    // Calculate sum of all elements in the grid
    const gridSum = grid
      .flat(2)
      .reduce((sum: number, val: number) => sum + val, 0);

    if (gridSum === 0) {
      return <BlackHole key={index} xPos={xPos} yPos={yPos} />;
    }

    // Return normal grid otherwise
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: yPos, z: 0 }} />
    );
  });
}
