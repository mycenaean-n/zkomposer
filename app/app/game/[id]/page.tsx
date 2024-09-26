'use client';
import { QrInviteModal } from '@/components/lobbies/QrInviteModal';
import { Footer } from '@components/game/Footer';
import { LoginCTA } from '@components/wallet/LoginCTA';
import { LoadingState } from '@components/zk/LoadingState';
import { useGameAndPuzzleData } from '@hooks/fetching/useGameAndPuzzleData';
import { useBlockNumber } from '@hooks/useBlockNumber';
import { useDeepCompareMemo } from '@hooks/useDeepCompareMemo';
import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { hasGameStarted, isGameFinished } from '@utils/game';
import { useEffect, useReducer, useState } from 'react';
import { zeroAddress } from 'viem';

const initialState = { yourScore: 0, opponentScore: 0 };

function scoreReducer(
  state: typeof initialState,
  action: { type: string; payload: number }
) {
  switch (action.type) {
    case 'SET_YOUR_SCORE':
      return { ...state, yourScore: action.payload };
    case 'SET_OPPONENT_SCORE':
      return { ...state, opponentScore: action.payload };
    default:
      return state;
  }
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data, loading, error } = useGameAndPuzzleData(id, shouldPoll);
  const [state, dispatch] = useReducer(scoreReducer, initialState);
  const stableInitConfig = useDeepCompareMemo(data?.initConfig);
  const gameFinished =
    data?.onChainGame &&
    blockNumber &&
    isGameFinished(blockNumber, data.onChainGame);
  const [isQrInviteModalOpen, setIsQrInviteModalOpen] = useState<boolean>(true);

  useEffect(() => {
    if (gameFinished) setShouldPoll(false);
  }, [gameFinished]);

  // useEffect(() => {
  //   const displayQrInvite =
  //     address &&
  //     data?.onChainGame.player1.address_ === address &&
  //     data?.onChainGame.player2?.address_ === zeroAddress;

  //   setIsQrInviteModalOpen(displayQrInvite ?? false);
  // }, [address, data?.onChainGame]);

  useEffect(() => {
    if (!data?.onChainGame || !address) return;

    const { onChainGame } = data;

    if (address === onChainGame.player1.address_) {
      dispatch({ type: 'SET_YOUR_SCORE', payload: onChainGame.player1.score });
      dispatch({
        type: 'SET_OPPONENT_SCORE',
        payload: onChainGame.player2!.score,
      });
    } else if (address === onChainGame.player2!.address_) {
      dispatch({ type: 'SET_YOUR_SCORE', payload: onChainGame.player2!.score });
      dispatch({
        type: 'SET_OPPONENT_SCORE',
        payload: onChainGame.player1.score,
      });
    }
  }, [data?.onChainGame, address]);

  if (!address && blockNumber) {
    return <LoginCTA />;
  }

  if (loading) {
    return LoadingState({ textMain: 'Loading game...' });
  }

  if (typeof error === 'string') {
    return LoadingState({ textMain: error });
  }

  const { onChainGame } = data;

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
    const winCase = state.yourScore > state.opponentScore;
    const drawCase = state.yourScore === state.opponentScore;

    return LoadingState({
      textMain: 'Game is finished',
      textSub:
        'Result: ' + (winCase ? 'You Won' : drawCase ? 'Draw' : 'You Lost'),
    });
  }

  const displayJoinGame =
    address &&
    onChainGame.player1.address_ !== address &&
    onChainGame.player2?.address_ === zeroAddress;

  return (
    <div className="flex-grow">
      {isQrInviteModalOpen && (
        <QrInviteModal setIsOpen={setIsQrInviteModalOpen} />
      )}
      {/* {displayJoinGame && <JoinGame game={onChainGame} gameId={id} />}
      {stableInitConfig && (
        <PuzzleMemoized
          initConfig={stableInitConfig}
          id={id}
          gameMode="multiplayer"
        />
      )} */}
      <Footer
        {...{
          yourScore: state.yourScore,
          opponentScore: state.opponentScore,
          data,
        }}
      />
    </div>
  );
}
