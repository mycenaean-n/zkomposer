'use client';
import { getCircuitFunctionName } from 'circuits';
import { mapGrid } from '../../utils';
import { puzzleMapping } from '../../mocks/puzzles';
import { Puzzle } from './Puzzle';
import { createContext, useContext, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useAccount, useBlockNumber } from 'wagmi';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';

const mockPuzzle = puzzleMapping[0];

export const GameContext = createContext({
  puzzle: {
    initConfig: { initialGrid: [], finalGrid: [], availableFunctions: [] },
    functions: { remaining: [], chosen: [] },
    setFunctions: () => {},
  },
  game: Game,
});

export function Game({ id }: { id: string }) {
  const [initialGrid, setInitialGrid] = useState<number[][]>(
    mapGrid(mockPuzzle.startingGrid)
  );
  const [finalGrid, setFinalGrid] = useState<number[][]>(
    mapGrid(mockPuzzle.finalGrid)
  );
  const [availableFunctions, setAvailableFunctions] = useState<
    CircuitFunctions[]
  >(
    mockPuzzle.availableFunctions.map((funcIndex) =>
      getCircuitFunctionName(funcIndex)
    )
  );
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const { games, loading } = useContext(GamesContext);
  const game = games.find((game) => game.id == id);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!game) {
    return <div>Game not found</div>;
  }


  const isGameFinished =
    blockNumber! >
    game.startingBlock + BigInt(game.interval * game.numberOfTurns);
  if (isGameFinished) {
    return <div>Game is finished</div>;
  }

  // if (address !== game.player1 && address !== game.player2) {
  // }

  return (
    <Puzzle
      initialGrid={initialGrid}
      finalGrid={finalGrid}
      availableFunctions={availableFunctions}
    />
  );
}
