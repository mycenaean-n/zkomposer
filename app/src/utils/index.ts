export function mapGrid(gridString: string): number[][] {
  const gridArray = Array.from(gridString);
  const grid: number[][] = [[], [], [], [], [], [], [], []];

  gridArray.forEach((value, index) => {
    const column = Math.floor(index / 8);
    grid[column].push(Number(value));
  });

  return grid;
}
