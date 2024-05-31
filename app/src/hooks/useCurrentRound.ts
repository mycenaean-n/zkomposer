import { OnChainGame } from '../types/Game';
import { useBlockNumber } from './useBlockNumber';

export function useCurrentRound(game?: OnChainGame) {
  const blockNumber = useBlockNumber();

  if (!game?.startingBlock || !blockNumber) return null;

  return (
    Math.floor(
      (Number(blockNumber) - Number(game.startingBlock)) / game.interval
    ) + 1
  );
}
