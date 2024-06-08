import { Address } from 'viem';

export type OnChainGame = {
  interval: number;
  numberOfRounds: number;
  player1: Player;
  player2: Player | null;
  puzzleSet: Address;
  startingBlock: bigint | null;
};

export type Game = {
  id: string;
  interval: number;
  numberOfTurns: number;
  player1: Address;
  player2: Address | null;
  puzzleSet: Address;
  startingBlock: string | null;
};

type Player = {
  address_: Address;
  score: number;
  totalBlocks: bigint;
};

export type FooterDisplayProps = {
  yourScore: number;
  blocksLeftThisTurn: number;
  opponentScore: number;
  currentRound: number;
  numberOfRounds: number;
};
