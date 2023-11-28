export enum Colors {
  White = 0,
  Yellow = 1,
  Red = 2,
  Blue = 3,
}
export interface Puzzles {
  [lvl: string]: {
    initial: Colors[][];
    transform: Colors[][];
    target: Colors[][];
  };
}
