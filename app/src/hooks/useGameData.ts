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

function useFetchPuzzleByGameId(game?: Game): InitalGameData | undefined {
  const [data, setData] = useState<{
    roundBlock: bigint;
    game: OnChainGame;
    puzzle: Puzzle;
  }>();
  const { selectPuzzle } = useZkubeContract();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (
      !game ||
      !game.id ||
      !selectPuzzle ||
      !hasGameStarted(blockNumber!, game) ||
      isGameFinished(blockNumber!, game) ||
      game.startingBlock === null
    )
      return;

    selectPuzzle(BigInt(game.id))
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectPuzzle, game, blockNumber]);

  if (!data || !data.game) return;

  return {
    ...data.puzzle,
    onChainGame: data.game,
  };
}

function useGameData({
  gameId,
  onChainGame,
}: {
  gameId?: string;
  onChainGame?: OnChainGame;
}) {
  const { getGame } = useZkubeContract();
  const [game, setGame] = useState<OnChainGame>();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (onChainGame || !getGame || !gameId) {
      return;
    }
    getGame(BigInt(gameId)).then((data) => {
      setGame(data);
    });
  }, [getGame, gameId, blockNumber]);

  return onChainGame || game;
}

export function useGameAndPuzzleData({ game }: { game?: Game }) {
  const puzzleData = useFetchPuzzleByGameId(game);
  const gameData = useGameData({
    gameId: game?.id,
    onChainGame: puzzleData?.onChainGame,
  });

  return useMemo(() => {
    if (gameData && !puzzleData)
      return { initConfig: undefined, onChainGame: gameData };
    if (
      !puzzleData?.availableFunctions ||
      !puzzleData?.finalGrid ||
      !puzzleData?.initialGrid
    )
      return {};

    return {
      initConfig: {
        availableFunctions: puzzleData.availableFunctions,
        finalGrid: puzzleData.finalGrid,
        initialGrid: puzzleData.initialGrid,
      },
      onChainGame: gameData,
    };
  }, [
    puzzleData,
    puzzleData?.availableFunctions,
    puzzleData?.finalGrid,
    puzzleData?.initialGrid,
    gameData,
  ]);
}
