'use client';
import { PuzzleMemoized } from './Puzzle';
import { useContext, useEffect, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '../../hooks/useBlockNumber';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { useContract } from '@/src/hooks/useContract';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { Footer } from './Footer';
import { useAccount } from 'wagmi';

export function Game({ id }: { id: string }) {
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [finalGrid, setFinalGrid] = useState<number[][]>([]);
  const [availableFunctions, setAvailableFunctions] = useState<
    CircuitFunctions[]
  >([]);
  const [yourScore, setYourScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const blockNumber = useBlockNumber();
  const { games, loading } = useContext(GamesContext);
  const { getPuzzle } = useContract();
  const {address} = useAccount()
  const game = games.find((game) => game.id == id);

  async function fetchPuzzle() {
    console.log('fetching puzzle');
    if (!game) throw new Error('Game not found');
    const { puzzle, game: onChainGame } = await getPuzzle(BigInt(game.id));
    setInitialGrid(puzzle.initialGrid);
    setFinalGrid(puzzle.finalGrid);
    setAvailableFunctions(puzzle.availableFunctions);
    if (address == onChainGame.player1.address_) {
      setYourScore(onChainGame.player1.score);
      setOpponentScore(onChainGame.player2!.score);
    }
    else if (address == onChainGame.player2!.address_) {
      setYourScore(onChainGame.player2!.score);
      setOpponentScore(onChainGame.player1.score);
    }
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
    'flex flex-grow justify-center items-center text-align-center w-screen h-full text-2xl';
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
    <div className="flex flex-col flex-grow h-full">
      <div className="flex-grow h-96">
        <PuzzleMemoized
          initialGrid={initialGrid}
          finalGrid={finalGrid}
          availableFunctions={availableFunctions}
        />
      </div>
      <Footer gameId={id} yourScore={yourScore} opponentScore={opponentScore}/>
    </div>
  );
}
