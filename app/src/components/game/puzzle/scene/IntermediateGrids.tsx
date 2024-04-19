import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { Grid } from './grid/Grid';

export default function IntermediateGrids({
  grids,
  availableFunctions,
}: {
  grids: number[][][];
  availableFunctions: CircuitFunctions[];
}) {
  const xGap = 5 / availableFunctions.length;
  let xPos = -2.5;
  return grids.map((grid, index) => {
    xPos += xGap;
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: -0.5, z: 0 }} />
    );
  });
}
