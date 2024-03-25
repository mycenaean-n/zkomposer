'use client';
import { Puzzle } from './Puzzle';
import { useContext, useEffect, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '../../hooks/useBlockNumber';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { useContract } from '@/src/hooks/useContract';
import { Game } from '@/src/types/Game';

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
    if (!game) throw new Error('Game not found');
    const { puzzle } = await getPuzzle(BigInt(game.id));
    console.log(puzzle.availableFunctions);
    setInitialGrid(puzzle.initialGrid);
    setFinalGrid(puzzle.finalGrid);
    setAvailableFunctions(puzzle.availableFunctions);
  }

  function isGameFinished(game: Game) {
    return (
      blockNumber! >
      BigInt(Number(game.startingBlock) + game.interval * game.numberOfTurns)
    );
  }

  function hasGameStarted(game: Game) {
    return blockNumber! > BigInt(game.startingBlock);
  }

  useEffect(() => {
    if (game) {
      if (hasGameStarted(game) && !isGameFinished(game)) {
        // first fetch
        if (initialGrid.length === 0) {
          fetchPuzzle();
        }
        // only fetch puzzle if new turn
        else if (
          Number(game.startingBlock) -
            (Number(blockNumber!) % game.interval) ===
          0
        ) {
          fetchPuzzle();
        }
      }
    }
  }, [loading, blockNumber]);

  const style = 'flex justify-center items-center text-align-center w-screen h-full';
  const LoadingState = (text: string) => <div className={style}><h1>{text}</h1></div>;

  if (loading) {
    return LoadingState('Loading...');
  }
  if (!game) {
    return LoadingState('Game not found');
  }

  if (isGameFinished(game)) {
    return LoadingState('Game is finished');
  }

  if (!hasGameStarted(game)) {
    return LoadingState(`Game starts in ${Number(game.startingBlock) - Number(blockNumber!)} blocks`);
  }

  return (
    <Puzzle
      initialGrid={initialGrid}
      finalGrid={finalGrid}
      availableFunctions={availableFunctions}
    />
  );
}
