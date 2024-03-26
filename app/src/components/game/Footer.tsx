'use client';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '@/src/hooks/useBlockNumber';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { useContext, useMemo } from 'react';

export function Footer({ gameId }: { gameId: string }) {
  const blockNumber = useBlockNumber();
  const { games } = useContext(GamesContext);
  const game = useMemo(() => {
    return games.find((game) => game.id === gameId);
  }, [games, gameId]);

  if (!game || !blockNumber) return null;

  if (isGameFinished(blockNumber, game)) return null;
  if (!hasGameStarted(blockNumber, game)) return null;

  const blocksLeftThisTurn =
    game.interval -
    ((Number(blockNumber) - Number(game.startingBlock)) % game.interval);

  return (
    <footer className="bg-black h-20 mt-auto">
      <div className="flex justify-between items-center h-full p-6 w-full text-white">
        <div className="flex flex-grow items-center" style={{flexBasis: 0}}>
          <h4 className="text-2xl font-bold text-left">
            your score
            <br />
            <span className="text-xl font-normal">0</span>
          </h4>
        </div>
        <div className="flex flex-grow items-center justify-center" style={{flexBasis: 0}}>
          <h4 className="text-2xl font-bold text-center">
            blocks left
            <br />
            <span className="text-xl font-normal">{blocksLeftThisTurn}</span>
          </h4>
        </div>
        <div className="flex flex-grow items-center justify-end" style={{flexBasis: 0}}>
          <h4 className="text-2xl font-bold text-right">
            opponent score
            <br />
            <span className="text-xl font-normal">0</span>
          </h4>
        </div>
      </div>
    </footer>
  );
}
