'use client';
import { useEffect, useMemo, useState } from 'react';
import { OnChainGame } from '../types/Game';
import { useBlockNumber } from './useBlockNumber';
import { Puzzle } from '../types/Puzzle';
import { useZkube } from './useContract';
import {
  CircuitFunctions,
  Colors,
} from 'circuits/types/circuitFunctions.types';

type GameAndPuzzleData = {
  initConfig?: {
    availableFunctions: CircuitFunctions[];
    finalGrid: Colors[][];
    initialGrid: Colors[][];
  };
  onChainGame?: OnChainGame;
};

export function useGameAndPuzzleData(id: string): {
  data: GameAndPuzzleData;
  loading: boolean;
} {
  const [data, setData] = useState<{
    roundBlock?: bigint;
    game: OnChainGame;
    puzzle?: Puzzle;
  }>();
  const { selectPuzzle } = useZkube();
  const blockNumber = useBlockNumber();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id || !selectPuzzle) return;

    selectPuzzle(BigInt(id))
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [selectPuzzle, id, blockNumber]);

  return useMemo(() => {
    if (!data || !data.game)
      return {
        data: { initConfig: undefined, onChainGame: undefined },
        loading,
      };

    const { game, puzzle } = data;

    if (
      !puzzle ||
      !puzzle.finalGrid ||
      !puzzle.initialGrid ||
      !puzzle.availableFunctions
    )
      return { data: { initConfig: undefined, onChainGame: game }, loading };

    return {
      data: {
        initConfig: {
          availableFunctions: puzzle.availableFunctions,
          finalGrid: puzzle.finalGrid,
          initialGrid: puzzle.initialGrid,
        },
        onChainGame: game,
      },
      loading,
    };
    // only reload when the puzzle changes
  }, [data?.puzzle?.initialGrid, data?.puzzle?.finalGrid, loading, data?.game]);
}
