import { Colors } from '../../types/circuitFunctions.types';

export function stack(column: Array<Colors>, color: Colors): Array<Colors> {
  // Find the index of the first zero element
  const firstZeroIndex = column.indexOf(0);

  // Replace the zero immediately following the last non-zero element
  if (firstZeroIndex > 0 && firstZeroIndex < column.length) {
    let newArr = [...column];
    newArr[firstZeroIndex] = color;
    return newArr;
  }

  // Return the original array if no replacement is needed
  return column;
}

export function stackGrid(
  grid: Array<Array<Colors>>,
  color: Colors
): Array<Array<Colors>> {
  return grid.map((col) => stack(col, color));
}
