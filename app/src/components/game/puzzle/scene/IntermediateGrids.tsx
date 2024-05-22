import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { Grid } from './grid/Grid';
import { isMobile } from 'react-device-detect';

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
    : 10 / availableFunctions.length;
  return grids.map((grid, index) => {
    xPos += xGap;
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: yPos, z: 0 }} />
    );
  });
}
