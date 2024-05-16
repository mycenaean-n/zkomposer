import { Colors } from 'circuits/types/circuitFunctions.types';

export function mapGrid(gridString: string): Colors[][] {
  const gridArray = Array.from(gridString);
  const grid: Colors[][] = [[], [], [], [], [], [], [], []];

  gridArray.forEach((value, index) => {
    const column = Math.floor(index / 8);
    grid[column].push(Number(value) as Colors);
  });

  return grid;
}
