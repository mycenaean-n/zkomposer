import {
  CircuitFunctions,
  Colors,
} from 'circuits/types/circuitFunctions.types';
import { Dispatch, SetStateAction } from 'react';

export enum PuzzleFunctionState {
  remaining = 'remaining',
  chosen = 'chosen',
}

export type PuzzleFunctions = Record<PuzzleFunctionState, CircuitFunctions[]>;

export type PuzzleContext = {
  initConfig: Puzzle;
  functions: PuzzleFunctions;
  setFunctions: Dispatch<SetStateAction<PuzzleFunctions>>;
};

export type Puzzle = {
  initialGrid: Colors[][];
  finalGrid: Colors[][];
  availableFunctions: CircuitFunctions[];
};

export type OnChainPuzzle = {
  startingGrid: string;
	finalGrid: string;
	availableFunctions: number[];
};