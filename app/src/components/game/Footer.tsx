'use client';
import { useEffect, useState } from 'react';
import { hasGameStarted, isGameFinished } from '@utils/game';
import { useGameAndPuzzleData } from '@hooks/fetching/useGameAndPuzzleData';
import { useCurrentRound } from '@hooks/useCurrentRound';
import { useBlockNumber } from '@hooks/useBlockNumber';
import { DesktopFooter } from './DesktopFooter';
import { isMobile } from 'react-device-detect';
import { MobileFooter } from './MobileFooter';

export function Footer({
  gameId,
  yourScore,
  opponentScore,
}: {
  gameId: string;
  yourScore: number;
  opponentScore: number;
}) {
  const blockNumber = useBlockNumber();
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data } = useGameAndPuzzleData(gameId, shouldPoll);
  const currentRound = useCurrentRound(data?.onChainGame);
  const gameFinished =
    data?.onChainGame &&
    blockNumber &&
    isGameFinished(blockNumber, data.onChainGame);

  useEffect(() => {
    if (gameFinished) setShouldPoll(false);
  }, [gameFinished]);

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
