'use client';
import React, { createContext } from 'react';
import { gql, useSubscription } from '@apollo/client';
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

export const GamesContext = createContext<{ games: Game[] }>({ games: [] });

export const GamesProvider = ({ children }: { children: React.ReactNode }) => {
  let games: Game[] = [];
  const { data } = useSubscription<{ games: Game[] }>(GAMES_SUBSCRIPTION);
  if (data) {
    games = data.games;
  }
  return (
    <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>
  );
};
