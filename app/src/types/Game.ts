export type Game = {
  id: number;
  interval: number;
  numberOfTurns: number;
  player1: `0x${string}`;
  player2: `0x${string}`;
  puzzleSet: `0x${string}`;
  stake: string;
  startingBlock: bigint;
};
