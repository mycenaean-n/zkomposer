export type GridValue = 0 | 1 | 2 | 3;
export type ColorType = 1 | 2 | 3;

export function transform(
  grid: GridValue[][],
  inColor: ColorType,
  outColor: ColorType
): GridValue[][] {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === inColor) {
        grid[i][j] = outColor;
      }
    }
  }
  return grid;
}
