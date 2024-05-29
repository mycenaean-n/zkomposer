'use client';
import { useEffect, useState } from 'react';
import { OnChainGame } from '../types/Game';
import { useBlockNumber } from './useBlockNumber';
import { Puzzle } from '../types/Puzzle';
import { useZkube } from './useContract';
import { useDeepCompareMemo } from 'use-deep-compare';

export function useGameAndPuzzleData(id: string) {
  const [data, setData] = useState<{
    roundBlock?: bigint;
    game: OnChainGame;
    puzzle?: Puzzle;
  }>();
  const { selectPuzzle } = useZkube();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (!id || !selectPuzzle) return;

    selectPuzzle(BigInt(id))
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [selectPuzzle, id, blockNumber]);

  return useDeepCompareMemo(() => {
    if (!data || !data.game)
      return { onChainGame: undefined, puzzle: undefined };

    const { game, puzzle } = data;

    if (
      !puzzle ||
      !puzzle.finalGrid ||
      !puzzle.initialGrid ||
      !puzzle.availableFunctions
    )
      return { initConfig: undefined, onChainGame: game };

    return {
      initConfig: {
        availableFunctions: puzzle.availableFunctions,
        finalGrid: puzzle.finalGrid,
        initialGrid: puzzle.initialGrid,
      },
      onChainGame: game,
    };
  }, [data]);
}
