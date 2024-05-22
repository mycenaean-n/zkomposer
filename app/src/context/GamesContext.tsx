'use client';
import React, { createContext, useState } from 'react';
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

export const GamesContext = createContext<{
  games: Game[];
  loading: boolean;
  link?: string;
  setLink: (link: string) => void;
}>({
  games: [],
  loading: false,
  link: undefined,
  setLink: () => {},
});

export const GamesProvider = ({ children }: { children: React.ReactNode }) => {
  let games: Game[] = [];
  const [link, setLink] = useState<string | undefined>();

  const { data, loading } = useSubscription<{ games: Game[] }>(
    GAMES_SUBSCRIPTION
  );

  if (data) {
    games = data.games;
  }

  return (
    <GamesContext.Provider value={{ games, loading, link, setLink }}>
      {children}
    </GamesContext.Provider>
  );
};
