'use client';
import { useBlockNumber } from '@/src/hooks/useBlockNumber';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { useGameAndPuzzleData } from '../../hooks/useGameAndPuzzleData';
import { useCurrentRound } from '../../hooks/useCurrentRound';

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
  const {
    data: { onChainGame },
  } = useGameAndPuzzleData(gameId);
  const currentRound = useCurrentRound(onChainGame);

  if (!onChainGame || !blockNumber || !currentRound) return null;
  if (isGameFinished(blockNumber, onChainGame)) return null;
  if (!hasGameStarted(blockNumber, onChainGame)) return null;

  const blocksLeftThisTurn =
    onChainGame.interval -
    ((Number(blockNumber) - Number(onChainGame.startingBlock)) %
      onChainGame.interval);

  return (
    <footer className="bg-black h-20 mt-auto">
      <div className="flex justify-between items-center h-full p-6 w-full text-white">
        <div className="flex flex-grow items-center basis-0">
          <h4 className="text-2xl font-bold text-left">
            your score
            <br />
            <span className="text-xl font-normal">{yourScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow items-center justify-center basis-0">
          <h4 className="text-2xl font-bold text-center">
            blocks left
            <br />
            <span className="text-xl font-normal">{blocksLeftThisTurn}</span>
          </h4>
        </div>
        <div className="flex flex-grow items-center justify-end basis-0">
          <h4 className="text-2xl font-bold text-right">
            opponent score
            <br />
            <span className="text-xl font-normal">{opponentScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow items-center justify-end basis-0">
          <h4 className="text-2xl font-bold text-right">
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
