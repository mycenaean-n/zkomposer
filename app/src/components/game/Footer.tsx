'use client';
import { hasGameStarted, isGameFinished } from '@utils/game';
import { useCurrentRound } from '@hooks/useCurrentRound';
import { useBlockNumber } from '@hooks/useBlockNumber';
import { DesktopFooter } from './DesktopFooter';
import { isMobile } from 'react-device-detect';
import { MobileFooter } from './MobileFooter';
import { Puzzle } from '../../types/Puzzle';
import { OnChainGame } from '../../types/Game';

export function Footer({
  yourScore,
  opponentScore,
  data,
}: {
  yourScore: number;
  opponentScore: number;
  data: {
    initConfig?: Puzzle;
    onChainGame: OnChainGame;
  };
}) {
  const blockNumber = useBlockNumber();
  const currentRound = useCurrentRound(data?.onChainGame);

  if (!data?.onChainGame || !blockNumber || !currentRound) return null;
  const { onChainGame } = data;
  if (isGameFinished(blockNumber, onChainGame)) return null;
  if (!hasGameStarted(blockNumber, onChainGame)) return null;

  const blocksLeftThisTurn =
    onChainGame.interval -
    ((Number(blockNumber) - Number(onChainGame.startingBlock)) %
      onChainGame.interval);

  return isMobile ? (
    <MobileFooter
      {...{
        yourScore,
        blocksLeftThisTurn,
        opponentScore,
        currentRound,
      }}
      numberOfRounds={onChainGame.numberOfRounds}
    />
  ) : (
    <DesktopFooter
      {...{
        yourScore,
        blocksLeftThisTurn,
        opponentScore,
        currentRound,
      }}
      numberOfRounds={onChainGame.numberOfRounds}
    />
  );
}
