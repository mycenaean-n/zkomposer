import { Colors } from '../../types/circuitFunctions.types';

export function transform(
  column: Array<Colors>,
  inColor: Colors,
  outColor: Colors
): Array<Colors> {
  // Base case: If the column is empty, return it as is
  if (column.length === 0) {
    return column;
  }

  // Recursive case: Transform the first element and concatenate it with the transformed rest of the array
  return [
    column[0] === inColor ? outColor : column[0],
    ...transform(column.slice(1), inColor, outColor),
  ];
}

export function transformGrid(
  grid: Array<Array<Colors>>,
  inColor: Colors,
  outColor: Colors
): Array<Array<Colors>> {
  return grid.map((column) => transform(column, inColor, outColor));
}
