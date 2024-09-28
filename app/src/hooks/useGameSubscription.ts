'use client';
import { gql, useSubscription } from '@apollo/client';
import { Game } from '../types/Game';

interface GameSubscriptionResult {
  game: Game;
  loading: boolean;
}

const GAME_SUBSCRIPTION = gql`
  subscription GameSubscription($id: String!) {
    gameById(id: $id) {
      id
      interval
      numberOfTurns
      player1
      player2
      puzzleSet
      startingBlock
    }
  }
`;

export function useGameSubscription(gameId: string) {
  const { data, loading, error } = useSubscription<{
    gameById: Game;
  }>(GAME_SUBSCRIPTION, {
    variables: { id: gameId },
  });

  // todo: don't throw
  if (error) {
    console.log('error', error);
    // throw new Error(error.message);
  }

  console.log('data', data);

  return { data: data?.gameById, loading, error };
}
