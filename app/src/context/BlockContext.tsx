'use client';
import React, { createContext } from 'react';
import { useBlockNumber } from 'wagmi';

const BlockContext = createContext<bigint | undefined>(undefined);

function BlockProvider({ children }: { children: React.ReactNode }) {
  const { data: blockNumber } = useBlockNumber({
    watch: { enabled: true, pollingInterval: 1000 },
  });

  return (
    <BlockContext.Provider value={blockNumber}>
      {children}
    </BlockContext.Provider>
  );
}

export { BlockContext, BlockProvider };
