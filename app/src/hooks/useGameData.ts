'use client';
import { useEffect, useMemo, useState } from 'react';
import { Game, OnChainGame } from '../types/Game';
import { hasGameStarted, isGameFinished } from '../utils/game';
import { useBlockNumber } from './useBlockNumber';
import { Puzzle } from '../types/Puzzle';
import { useZkubeContract } from './useContract';

type InitalGameData = Puzzle & {
  onChainGame: OnChainGame;
};

async function fetchPuzzleByGameId(
  gameId: string
): Promise<InitalGameData | undefined> {
  const { selectPuzzle } = useZkubeContract();

  if (!selectPuzzle) return undefined;

  const {
    puzzle: { initialGrid, finalGrid, availableFunctions },
    game: onChainGame,
  } = await selectPuzzle(BigInt(gameId));
  if (!onChainGame) throw new Error('Game not found');

  return { initialGrid, finalGrid, availableFunctions, onChainGame };
}

export function useGameData({
  game,
  loading,
}: {
  game?: Game;
  loading: boolean;
}) {
  const [gameData, setInitialGameData] = useState<InitalGameData>();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (game) {
      if (
        hasGameStarted(blockNumber!, game) &&
        !isGameFinished(blockNumber!, game)
      ) {
        if (
          // first fetch
          gameData?.initialGrid.length === 0 ||
          // only fetch puzzle if new turn
          (Number(blockNumber) - Number(game.startingBlock)) % game.interval ===
            0
        ) {
          fetchPuzzleByGameId(game.id).then((data?: InitalGameData) => {
            setInitialGameData(data);
          });
        }
      }
    }
  }, [loading, blockNumber]);

  return useMemo(() => {
    if (!gameData) return {};

    return {
      initConfig: {
        availableFunctions: gameData?.availableFunctions,
        finalGrid: gameData?.finalGrid,
        initialGrid: gameData?.initialGrid,
      },
      onChainGame: gameData?.onChainGame,
    };
  }, [
    gameData,
    gameData?.availableFunctions,
    gameData?.finalGrid,
    gameData?.initialGrid,
    gameData?.onChainGame,
  ]);
}
