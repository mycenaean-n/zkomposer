'use client';
import { PuzzleMemoized } from './Puzzle';
import { useContext, useEffect, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '../../hooks/useBlockNumber';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { useContract } from '@/src/hooks/useContract';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';

export function Game({ id }: { id: string }) {
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [finalGrid, setFinalGrid] = useState<number[][]>([]);
  const [availableFunctions, setAvailableFunctions] = useState<
    CircuitFunctions[]
  >([]);
  const blockNumber = useBlockNumber();
  const { games, loading } = useContext(GamesContext);
  const { getPuzzle } = useContract();
  const game = games.find((game) => game.id == id);

  async function fetchPuzzle() {
    console.log('fetching puzzle')
    if (!game) throw new Error('Game not found');
    const { puzzle } = await getPuzzle(BigInt(game.id));
    setInitialGrid(puzzle.initialGrid);
    setFinalGrid(puzzle.finalGrid);
    setAvailableFunctions(puzzle.availableFunctions);
  }

  useEffect(() => {
    if (game) {
      if (
        hasGameStarted(blockNumber!, game) &&
        !isGameFinished(blockNumber!, game)
      ) {
        // first fetch
        if (initialGrid.length === 0) {
          fetchPuzzle();
        }
        // only fetch puzzle if new turn
        else if (
          (Number(blockNumber) - Number(game.startingBlock)) % game.interval ===
          0
        ) {
          fetchPuzzle();
        }
      }
    }
  }, [loading, blockNumber]);

  const style =
    'flex justify-center items-center text-align-center w-screen h-full text-2xl';
  const LoadingState = (text: string) => (
    <div className={style}>
      <h1>{text}</h1>
    </div>
  );

  if (loading) {
    return LoadingState('Loading...');
  }
  if (!game) {
    return LoadingState('Game not found');
  }

  if (isGameFinished(blockNumber!, game)) {
    return LoadingState('Game is finished');
  }

  if (!hasGameStarted(blockNumber!, game)) {
    return LoadingState(
      `Game starts in ${Number(game.startingBlock) - Number(blockNumber!)} blocks`
    );
  }

  return (
    <PuzzleMemoized
      initialGrid={initialGrid}
      finalGrid={finalGrid}
      availableFunctions={availableFunctions}
    />
  );
}
