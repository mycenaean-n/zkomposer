'use client';
import { PuzzleMemoized } from './Puzzle';
import { useContext, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '../../hooks/useBlockNumber';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { Footer } from './Footer';
import { useAccount } from 'wagmi';
import { useGameData } from '../../hooks/useGameData';

export function MultiplayerGame({ id }: { id: string }) {
  const [yourScore, setYourScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const blockNumber = useBlockNumber();
  const { games, loading } = useContext(GamesContext);
  const { address } = useAccount();
  const game = games.find((game) => game.id == id);
  const { initConfig, onChainGame } = useGameData({ game, loading });

  if (onChainGame) {
    if (address == onChainGame.player1.address_) {
      setYourScore(onChainGame.player1.score);
      setOpponentScore(onChainGame.player2!.score);
    } else if (address == onChainGame.player2!.address_) {
      setYourScore(onChainGame.player2!.score);
      setOpponentScore(onChainGame.player1.score);
    }
  }

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
        {initConfig && <PuzzleMemoized initConfig={initConfig} gameId={id} />}
      </div>
      <Footer gameId={id} yourScore={yourScore} opponentScore={opponentScore} />
    </div>
  );
}
