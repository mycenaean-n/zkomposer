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

  const elements: JSX.Element[] = [];

  for (let index = 0; index < grids.length; index++) {
    xPos += xGap;
    const grid = grids[index];

    const gridSum = grid
      .flat(2)
      .reduce((sum: number, val: number) => sum + val, 0);

    if (gridSum === 0) {
      elements.push(<BlackHole key={index} xPos={xPos} yPos={yPos} />);
      break;
    }

    elements.push(
      <Grid key={index} grid={grid} position={{ x: xPos, y: yPos, z: 0 }} />
    );
  }

  return <>{elements}</>;
}
