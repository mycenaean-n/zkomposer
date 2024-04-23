import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { Grid } from './grid/Grid';

export default function IntermediateGrids({
  grids,
  availableFunctions,
  xPos,
}: {
  grids: number[][][];
  availableFunctions: CircuitFunctions[];
  xPos: number;
}) {
  const xGap = 5 / availableFunctions.length;
  return grids.map((grid, index) => {
    xPos += xGap;
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: -0.5, z: 0 }} />
    );
  });
}
