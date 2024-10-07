import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { isMobile } from 'react-device-detect';
import { Grid } from './grid/Grid';

export default function IntermediateGrids({
  grids,
  availableFunctions,
  xPos,
  yPos,
}: {
  grids: number[][][];
  availableFunctions: CircuitFunctions[];
  xPos: number;
  yPos: number;
}) {
  const xGap = isMobile
    ? 8 / availableFunctions.length
    : 5 / availableFunctions.length;
  return grids.map((grid, index) => {
    xPos += xGap;
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: yPos, z: 0 }} />
    );
  });
}
