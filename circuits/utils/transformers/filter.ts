import config from '../../config';
import { Colors } from '../../types/circuitFunctions.types';

export function filter(
  grid: Array<Array<Colors>>,
  color: Colors
): Array<Array<Colors>> {
  if (!grid.length) return [];
  const [firstColumn, ...restOfGrid] = grid;

  const [columnToAddFirst, columnToAddLast] = firstColumn.includes(color)
    ? [[], [Array(config.gridHeight).fill(0)]]
    : [[firstColumn], []];

  return [
    ...columnToAddFirst,
    ...filter(restOfGrid, color),
    ...columnToAddLast,
  ];
}
