import { Address } from 'viem';

export type OnChainGame = {
  interval: number;
  numberOfRounds: number;
  player1: Player;
  player2: Player | null;
  puzzleSet: Address;
  startingBlock: bigint;
};

export type Game = {
  id: string;
  interval: number;
  numberOfTurns: number;
  player1: Address;
  player2: Address | null;
  puzzleSet: Address;
  startingBlock: string;
}

type Player = {
  address_: Address;
  score: number;
  totalBlocks: bigint;
};
