import { GRID_HEIGHT } from '../../config';
import { Colors } from '../../types/circuitFunctions.types';

export function filter(
  grid: Array<Array<Colors>>,
  color: Colors
): Array<Array<Colors>> {
  if (!grid.length) return [];
  const [firstColumn, ...restOfGrid] = grid;

  const [columnToAddFirst, columnToAddLast] = firstColumn.includes(color)
    ? [[], [Array(GRID_HEIGHT).fill(0)]]
    : [[firstColumn], []];

  return [
    ...columnToAddFirst,
    ...filter(restOfGrid, color),
    ...columnToAddLast,
  ];
}
