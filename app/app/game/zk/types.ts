import { Address } from 'viem';

export interface Proof {
  Input: string[];
  a: [bigint, bigint];
  b: [[bigint, bigint], [bigint, bigint]];
  c: [bigint, bigint];
}

export interface InputSignals {
  initialGrid: number[][];
  finalGrid: number[][];
  account: Address;
  selectedFunctions: number[][][];
}
