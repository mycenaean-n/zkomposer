'use client';
import React, { createContext, useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Game } from '../types/Game';

export const GamesContext = createContext<{
  setLink: (link: string) => void;
}>({
  setLink: () => {},
});

export const GamesProvider = ({ children }: { children: React.ReactNode }) => {
  const [link, setLink] = useState<string | undefined>();

  return (
    <GamesContext.Provider value={{ setLink }}>
      {children}
    </GamesContext.Provider>
  );
};
