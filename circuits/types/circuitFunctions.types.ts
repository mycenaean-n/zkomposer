export enum OnOff {
  On = 1,
  Off = 0,
}

export enum Colors {
  White = 0,
  Yellow = 1,
  Red = 2,
  Blue = 3,
}

export interface Puzzles {
  [lvl: string]: {
    initial: Colors[][];
    target: Colors[][];
    transform: Colors[][];
    stack: Colors[][];
    transformTwo: Colors[][];
    reverse: Colors[][];
  };
}

export const circuitFunctionsArray = [
  'EMPTY',
  'TRANSFORM_YELLOW_RED',
  'TRANSFORM_YELLOW_BLUE',
  'TRANSFORM_RED_YELLOW',
  'TRANSFORM_RED_BLUE',
  'TRANSFORM_BLUE_YELLOW',
  'TRANSFORM_BLUE_RED',
  'STACK_YELLOW',
  'STACK_RED',
  'STACK_BLUE',
  'TRANSFORMTWO_YELLOW_RED',
  'TRANSFORMTWO_YELLOW_BLUE',
  'TRANSFORMTWO_RED_YELLOW',
  'TRANSFORMTWO_RED_BLUE',
  'TRANSFORMTWO_BLUE_YELLOW',
  'TRANSFORMTWO_BLUE_RED',
] as const;

export type CircuitFunctions = (typeof circuitFunctionsArray)[number];
