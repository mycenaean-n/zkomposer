'use client';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { ZKProofCalldata } from '../types/Proof';

interface ProofCalldataContextType {
  proofCalldata: ZKProofCalldata | null;
  setProofCalldata: Dispatch<SetStateAction<ZKProofCalldata | null>>;
  nullifyProofCalldata: () => void;
}

const ProofCalldataContext = createContext<
  ProofCalldataContextType | undefined
>(undefined);

export function ProofCalldataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [proofCalldata, setProofCalldata] = useState<ZKProofCalldata | null>(
    null
  );

  const nullifyProofCalldata = useCallback(() => {
    setProofCalldata(null);
  }, []);

  return (
    <ProofCalldataContext.Provider
      value={{ proofCalldata, setProofCalldata, nullifyProofCalldata }}
    >
      {children}
    </ProofCalldataContext.Provider>
  );
}

export function useProofCalldata() {
  const context = useContext(ProofCalldataContext);
  if (context === undefined) {
    throw new Error(
      'useProofCalldata must be used within a ProofCalldataProvider'
    );
  }
  return context;
}
