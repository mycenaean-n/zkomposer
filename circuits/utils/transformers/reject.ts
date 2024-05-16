import { removeColumnWithLeadingZero } from './removeColumnWithLeadingZero';
import { Colors } from '../../types/circuitFunctions.types';

export function reject(column: Array<Colors>, color: Colors): Array<Colors> {
  if (column.length === 0) return [];
  const [firstElement, ...restOfColumn] = column;
  const [elementToAddFirst, elementToAddLast] =
    firstElement === color ? [[], [0]] : [[firstElement], []];

  return [
    ...elementToAddFirst,
    ...reject(restOfColumn, color),
    ...elementToAddLast,
  ] as Colors[];
}
export function rejectGrid(
  grid: Array<Array<Colors>>,
  color: Colors
): Array<Array<Colors>> {
  return removeColumnWithLeadingZero(grid.map((col) => reject(col, color)));
}
