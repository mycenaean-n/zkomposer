import { Colors } from '../../types/circuitFunctions.types';

export function removeColumnWithLeadingZero(
  grid: Array<Array<Colors>>
): Array<Array<Colors>> {
  if (grid.length === 1) return grid;

  const [firstColumn, ...restOfColumns] = grid;

  const [columnToAddFirst, columnToAddLast] =
    firstColumn[0] === 0
      ? [[], [Array(firstColumn.length).fill(0)]]
      : [[firstColumn], []];

  return [
    ...columnToAddFirst,
    ...removeColumnWithLeadingZero(restOfColumns),
    ...columnToAddLast,
  ];
}
