import { Hex } from 'viem';

export interface Proof {
  a: [Hex, Hex];
  b: [[Hex, Hex], [Hex, Hex]];
  c: [Hex, Hex];
}

export type ZKProofCalldata = {
  a: readonly [bigint, bigint];
  b: readonly [readonly [bigint, bigint], readonly [bigint, bigint]];
  c: readonly [bigint, bigint];
  input: bigint[];
};
