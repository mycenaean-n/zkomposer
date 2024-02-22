import { Hex } from 'viem';

export interface Proof {
  a: [Hex, Hex];
  b: [[Hex, Hex], [Hex, Hex]];
  c: [Hex, Hex];
}
