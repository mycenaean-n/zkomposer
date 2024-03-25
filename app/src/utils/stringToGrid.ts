import { Colors } from "circuits";

export function stringToGrid(str: string): Colors[][] {
  if (str.length % 8 !== 0) {
    throw new Error('String length must be a multiple of 8');
  }

  const grid: Colors[][] = [];

  for (let i = 0; i < str.length; i += 8) {
    const row = str.slice(i, i + 8).split('').map((char) => parseInt(char));
    grid.push(row as Colors[]);
  }

  return grid;
}