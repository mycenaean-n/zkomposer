import { COLORS, Colors } from 'circuits/types/circuitFunctions.types';
import { GRID_HEIGHT, GRID_WIDTH } from '../config';

function isValidColor(value: number): value is Colors {
  return Object.values(COLORS).includes(value as Colors);
}

export function mapGrid(gridString: string, padding: number = 0): Colors[][] {
  const heightWithPadding = GRID_HEIGHT + padding;
  const gridArray = Array.from(gridString);
  const grid: Colors[][] = Array.from({ length: GRID_WIDTH }, () =>
    Array.from({ length: heightWithPadding }, () => COLORS.WHITE)
  );

  gridArray.forEach((value, index) => {
    const column = Math.floor(index / GRID_HEIGHT);
    const columnIndex = index % GRID_HEIGHT;
    if (isValidColor(Number(value))) {
      grid[column][columnIndex] = Number(value) as Colors;
    } else {
      // TODO: don't throw, use zod
      throw new Error(`Invalid color: ${value}`);
    }
  });

  return grid;
}
