'use client';
import { LoadingState } from '@components/zk/LoadingState';
import { useBlockNumber } from '@hooks/useBlockNumber';
import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { useEffect, useState } from 'react';
import { PuzzleMemoized } from '../../../src/components/game/puzzle/Puzzle';
import { usePuzzleData } from '../../../src/hooks/fetching/usePuzzleData';
import { useGameSubscription } from '../../../src/hooks/useGameSubscription';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const [yourScore, setYourScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [isQrInviteModalOpen, setIsQrInviteModalOpen] =
    useState<boolean>(false);
  const { data: gameData, loading, error } = useGameSubscription(id);
  const { data: puzzleData } = usePuzzleData(id);

  // const gameFinished =
  //   data?.onChainGame &&
  //   blockNumber &&
  //   isGameFinished(blockNumber, data.onChainGame);
  // useEffect(() => {
  //   if (gameFinished) setShouldPoll(false);
  // }, [gameFinished]);

  useEffect(() => {
    if (!gameData || !address) return;

    // const { onChainGame } = data;

    if (address === gameData.player1) {
      // todo: get score from onChainGame
      setYourScore(0);
      setOpponentScore(0);
    } else if (address === gameData.player2) {
      setYourScore(0);
      setOpponentScore(0);
    }
  }, [gameData?.id, gameData?.player1, gameData?.player2, address]);

  // if (!address && blockNumber) {
  //   return <LoginCTA />;
  // }

  // if (loading) {
  //   return LoadingState({ textMain: 'Loading game...' });
  // }

  // if (typeof error === 'string') {
  //   return LoadingState({ textMain: error });
  // }

  // const { onChainGame } = data;

  console.log({ gameData });

  if (!gameData) {
    return LoadingState({ textMain: 'Game not found' });
  }

  // if (
  //   gameData?.player1 &&
  //   gameData?.player2 !== zeroAddress &&
  //   !hasGameStarted(blockNumber!, gameData)
  // ) {
  //   return LoadingState({
  //     textMain: `Game starting in ${
  //       Number(gameData.startingBlock) - Number(blockNumber)
  //     } blocks`,
  //   });
  // }

  // if (isGameFinished(blockNumber!, gameData)) {
  //   const winCase = yourScore > opponentScore;
  //   const drawCase = yourScore === opponentScore;

  //   return LoadingState({
  //     textMain: 'Game is finished',
  //     textSub:
  //       'Result: ' + (winCase ? 'You Won' : drawCase ? 'Draw' : 'You Lost'),
  //   });
  // }

  const displayJoinGame =
    address && gameData.player1 !== address && !gameData.player2;

  const displayInviteOpponent =
    address && gameData.player1 === address && !gameData.player2;

  console.log({ puzzleData });

  return (
    // todo: set
    <div className="h-full">
      <div className="mx-auto">
        {/* {displayInviteOpponent && (
          <InviteOpponent setIsOpen={setIsQrInviteModalOpen} />
        )}
        {displayJoinGame && <JoinGame game={gameData} gameId={id} />} */}
        {puzzleData && (
          <PuzzleMemoized
            initConfig={puzzleData}
            id={id}
            gameMode="multiplayer"
          />
        )}
        {/* <Footer {...{ yourScore, opponentScore, data: gameData }} /> */}
      </div>
    </div>
  );
}
