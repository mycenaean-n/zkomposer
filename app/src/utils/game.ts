import { Game, OnChainGame } from '../types/Game';

export function isGameFinished(currentBlock: bigint, game: OnChainGame) {
  return (
    game.startingBlock &&
    currentBlock >=
      BigInt(Number(game.startingBlock) + game.interval * game.numberOfRounds)
  );
}

export function hasGameStarted(currentBlock: bigint, game: OnChainGame) {
  return !!game.startingBlock && currentBlock >= BigInt(game.startingBlock);
}
