import { OnChainPuzzle } from 'app/src/types/Puzzle';
import { getCircuitFunctionIndex } from 'circuits';
import {
  CircuitFunctions,
  circuitFunctionsArray,
} from 'circuits/types/circuitFunctions.types';

function getRandomCircuitFunctions(count: number = 8): CircuitFunctions[] {
  const shuffled = [...circuitFunctionsArray].sort(() => Math.random() - 0.5);
  return shuffled.slice(1, count + 1) as CircuitFunctions[];
}

const puzzle: {
  availableFunctions: CircuitFunctions[];
  initial: number[][];
  target: number[][];
} = {
  availableFunctions: [
    'TRANSFORM_RED_YELLOW',
    'TRANSFORMTWO_BLUE_RED_BLUE',
    'REJECT_YELLOW',
    'TRANSFORM_BLUE_RED',
    'FILTER_RED',
    'TRANSFORMTWO_YELLOW_YELLOW_BLUE',
    'STACK_RED',
    'EMPTY',
  ],
  initial: [
    [3, 2, 3, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0],
    [3, 3, 3, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [3, 1, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  target: [
    [2, 2, 2, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export function convertBase4ToHexPuzzle() {
  const puzzleMapping: OnChainPuzzle = {} as OnChainPuzzle;
  puzzleMapping.availableFunctions = getCircuitFunctionIndex(
    puzzle.availableFunctions as CircuitFunctions[]
  );
  puzzleMapping.startingGrid = puzzle.initial.flatMap((el) => el).join('');
  puzzleMapping.finalGrid = puzzle.target.flatMap((el) => el).join('');

  return puzzleMapping;
}
