import { Address, Hash } from 'viem';

export type Game = {
  id: string;
  interval: number;
  numberOfTurns: number;
  player1: Player;
  player2: Player | null;
  puzzleSet: Hash;
  startingBlock: bigint;
};

type Player = {
  address_: Address;
  score: number;
  totalBlocks: bigint;
};
