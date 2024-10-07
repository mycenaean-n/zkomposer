import {
  AvailableFunctions,
  COLORS,
  Colors,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';
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

const colorClassMap: Record<ColorsKeys, string> = {
  WHITE: 'bg-white',
  YELLOW: 'bg-yellow-500',
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
} as const;

export function bgColor(color: ColorsKeys): string {
  const bgClass = colorClassMap[color];
  if (!bgClass) {
    throw new Error(`Unexpected color: ${color}`);
  }
  return bgClass;
}

const functionDisplayNames: Record<AvailableFunctions, string> = {
  EMPTY: 'empty',
  TRANSFORM: 'transform',
  STACK: 'stack',
  TRANSFORMTWO: 'map',
  REJECT: 'reject',
  FILTER: 'filter',
} as const;

export function getDisplayName(func: AvailableFunctions): string {
  const displayName = functionDisplayNames[func];
  if (!displayName) {
    throw new Error(`Unexpected function: ${func}`);
  }
  return displayName;
}
