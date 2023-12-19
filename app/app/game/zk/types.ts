export interface Proof {
  a: [bigint, bigint];
  b: [[bigint, bigint], [bigint, bigint]];
  c: [bigint, bigint];
}

export interface InputSignals {
  initialGrid: number[][];
  finalGrid: number[][];
  account: string;
  selectedFunctions: number[][][];
}
