'use client';
import { useBlockNumber } from '@/src/hooks/useBlockNumber';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { useGameAndPuzzleData } from '../../hooks/fetching/useGameAndPuzzleData';
import { useCurrentRound } from '../../hooks/useCurrentRound';
import { useEffect, useState } from 'react';

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
  const {
    data: { onChainGame },
  } = useGameAndPuzzleData(gameId, shouldPoll);
  const currentRound = useCurrentRound(onChainGame);
  const gameFinished =
    onChainGame && blockNumber && isGameFinished(blockNumber, onChainGame);

  useEffect(() => {
    if (gameFinished) setShouldPoll(false);
  }, [gameFinished]);

  if (!onChainGame || !blockNumber || !currentRound) return null;
  if (isGameFinished(blockNumber, onChainGame)) return null;
  if (!hasGameStarted(blockNumber, onChainGame)) return null;

  const blocksLeftThisTurn =
    onChainGame.interval -
    ((Number(blockNumber) - Number(onChainGame.startingBlock)) %
      onChainGame.interval);

  return (
    <footer className="mt-auto h-20 bg-black">
      <div className="flex h-full w-full items-center justify-between p-6 text-white">
        <div className="flex flex-grow basis-0 items-center">
          <h4 className="text-left text-2xl font-bold">
            your score
            <br />
            <span className="text-xl font-normal">{yourScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-center">
          <h4 className="text-center text-2xl font-bold">
            blocks left
            <br />
            <span className="text-xl font-normal">{blocksLeftThisTurn}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right text-2xl font-bold">
            opponent score
            <br />
            <span className="text-xl font-normal">{opponentScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right text-2xl font-bold">
            round
            <br />
            <span className="text-xl font-normal">
              {currentRound + ' of ' + onChainGame.numberOfRounds}
            </span>
          </h4>
        </div>
      </div>
    </footer>
  );
}
