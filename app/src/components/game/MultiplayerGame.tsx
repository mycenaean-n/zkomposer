'use client';
import { PuzzleMemoized } from './puzzle/Puzzle';
import { use, useContext, useEffect, useState } from 'react';
import { GamesContext } from '@/src/context/GamesContext';
import { useBlockNumber } from '../../hooks/useBlockNumber';
import { hasGameStarted, isGameFinished } from '@/src/utils/game';
import { Footer } from './Footer';
import { useGameAndPuzzleData } from '../../hooks/useGameData';
import JoinGameModal from '../lobbies/JoinGameModal';
import QrModal from '../lobbies/QrModal';
import { usePrivyWalletAddress } from '../../hooks/usePrivyWalletAddress';
import { useZkube } from '../../hooks/useContract';
import { zeroAddress } from 'viem';
import { LoginCTA } from '../wallet/LoginCTA';

export function MultiplayerGame({ id }: { id: string }) {
  const blockNumber = useBlockNumber();
  // const { games, loading } = useContext(GamesContext);
  // const game = games.find((g) => g.id === id);
  // const { getGame } = useZkube();
  const address = usePrivyWalletAddress();
  const { initConfig, onChainGame } = useGameAndPuzzleData(id);
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);
  const [yourScore, setYourScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);

  useEffect(() => {
    if (!onChainGame || !address) return;

    if (address == onChainGame.player1.address_) {
      setYourScore(onChainGame.player1.score);
      setOpponentScore(onChainGame.player2!.score);
    } else if (address == onChainGame.player2!.address_) {
      setYourScore(onChainGame.player2!.score);
      setOpponentScore(onChainGame.player1.score);
    }
  }, [onChainGame, address]);

  const LoadingState = ({
    textMain,
    textSub,
  }: {
    textMain: string;
    textSub?: string;
  }) => (
    <div className="flex flex-grow justify-center items-center flex-col text-align-center w-screen h-full text-2xl">
      <h1>{textMain}</h1>
      <h1 className="mt-4">{textSub}</h1>
    </div>
  );

  console.log({ onChainGame, initConfig });

  if (!onChainGame) {
    return LoadingState({ textMain: 'Loading game...' });
  }

  if (!onChainGame) {
    return LoadingState({ textMain: 'Game not found' });
  }

  if (
    onChainGame?.player1.address_ &&
    onChainGame?.player2?.address_ !== zeroAddress &&
    !hasGameStarted(blockNumber!, onChainGame)
  ) {
    return LoadingState({
      textMain: `Game starting in ${
        Number(onChainGame.startingBlock) - Number(blockNumber)
      } blocks`,
    });
  }

  if (isGameFinished(blockNumber!, onChainGame)) {
    return LoadingState({
      textMain: 'Game is finished',
      textSub:
        'Result: ' +
        (yourScore > opponentScore
          ? 'You Won'
          : yourScore === opponentScore
            ? 'Draw'
            : 'You Lost'),
    });
  }

  return (
    <div className="flex flex-col flex-grow h-full">
      {(address &&
        onChainGame.player1.address_ === address &&
        onChainGame.player2?.address_ === zeroAddress && (
          <QrModal setInputsShowing={setInputsShowing} />
        )) ||
        (address &&
          onChainGame.player1.address_ !== address &&
          onChainGame.player1.address_ !== address &&
          onChainGame.player2?.address_ === zeroAddress && (
            <JoinGameModal
              game={onChainGame}
              setInputsShowing={setInputsShowing}
              gameId={id}
            />
          ))}
      <div className="flex-grow h-96">
        {initConfig && (
          <PuzzleMemoized
            initConfig={initConfig}
            gameId={id}
            gameMode="multiplayer"
          />
        )}
      </div>
      {onChainGame && (
        <Footer
          gameId={id}
          yourScore={yourScore}
          opponentScore={opponentScore}
        />
      )}
    </div>
  );
}
