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
  initConfig: PuzzleInit;
  functions: PuzzleFunctions;
  setFunctions: Dispatch<SetStateAction<PuzzleFunctions>>;
};

export type PuzzleInit = {
  initialGrid: Colors[][];
  finalGrid: Colors[][];
  availableFunctions: CircuitFunctions[];
};
