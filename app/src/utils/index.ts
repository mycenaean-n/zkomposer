import {
  AvailableFunctions,
  Colors,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';

export function mapGrid(gridString: string): Colors[][] {
  const gridArray = Array.from(gridString);
  const grid: Colors[][] = Array.from({ length: 8 }, () => []);

  gridArray.forEach((value, index) => {
    const column = Math.floor(index / 8);
    grid[column].push(Number(value) as Colors);
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
