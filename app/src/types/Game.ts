import { Address, Hash } from "viem";

export type Game = {
  id: number;
  interval: number;
  numberOfTurns: number;
  player1: Address;
  player2: Address | null;
  puzzleSet: Hash;
  stake: string;
  startingBlock: bigint;
};
