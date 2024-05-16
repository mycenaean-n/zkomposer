import { Colors } from '../../types/circuitFunctions.types';
import { reject } from './reject';

function removeAirBubbles(column: Array<Colors>): Array<Colors> {
  return reject(column, 0);
}

export function removeAirBubblesGrid(
  grid: Array<Array<Colors>>
): Array<Array<Colors>> {
  return grid.map((col) => removeAirBubbles(col));
}
