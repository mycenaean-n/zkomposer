'use client';
import { useEffect, useState } from 'react';
import { hasGameStarted, isGameFinished } from '@utils/game';
import { useGameAndPuzzleData } from '@hooks/fetching/useGameAndPuzzleData';
import { useCurrentRound } from '@hooks/useCurrentRound';
import { useBlockNumber } from '@hooks/useBlockNumber';

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

  return (
    <footer className="absolute bottom-0 left-0 right-0 mt-auto flex h-20 bg-black p-2 text-center">
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
            blocks left in round {currentRound}
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
