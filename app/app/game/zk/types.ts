import { Address, Hex } from 'viem';

export interface Proof {
  a: [Hex, Hex];
  b: [[Hex, Hex], [Hex, Hex]];
  c: [Hex, Hex];
  Input: Hex[];
}

export interface InputSignals {
  initialGrid: number[][];
  finalGrid: number[][];
  account: Address;
  selectedFunctionsIndexes: number[];
}
