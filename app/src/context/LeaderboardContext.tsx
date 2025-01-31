'use client';
import { createContext, useCallback, useContext, useState } from 'react';

interface LeaderboardContextType {
  isLeaderboardOpen: boolean;
  setIsLeaderboardOpen: (isOpen: boolean) => void;
  closeLeaderboard: () => void;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
  undefined
);

export function LeaderboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const closeLeaderboard = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsLeaderboardOpen(false);
    }
  }, []);

  return (
    <LeaderboardContext.Provider
      value={{
        isLeaderboardOpen,
        setIsLeaderboardOpen,
        closeLeaderboard,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within LeaderboardProvider');
  }
  return context;
}
