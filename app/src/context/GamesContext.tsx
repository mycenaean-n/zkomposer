'use client';
import { gql, useSubscription } from '@apollo/client';
import React, { createContext } from 'react';
import { Game } from '../types/Game';

const GAMES_SUBSCRIPTION = gql`
  subscription OnGameUpdate {
    games {
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

export const GamesContext = createContext<{ games: Game[]; loading: boolean }>({
  games: [],
  loading: false,
});

export const GamesProvider = ({ children }: { children: React.ReactNode }) => {
  let games: Game[] = [];
  const { data, loading } = useSubscription<{ games: Game[] }>(
    GAMES_SUBSCRIPTION
  );
  if (data) {
    games = data.games;
  }
  return (
    <GamesContext.Provider value={{ games, loading }}>
      {children}
    </GamesContext.Provider>
  );
};
