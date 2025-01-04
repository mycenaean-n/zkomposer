'use client';
import { generateGroth16Proof, verifyGroth16Proof } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { zeroAddress } from 'viem';
import { useInputSignals } from '../components/zk/hooks/useInputSignal';
import { usePrivyWalletAddress } from '../hooks/privy/usePrivyWalletAddress';
import { generateGroth16ProofCalldataParsed } from '../hooks/useProof';
import { useRouteParams } from '../hooks/useRouteChange';
import { ZKProofCalldata } from '../types/Proof';

interface ProofCalldataContextType {
  proofCalldata: ZKProofCalldata | null;
  setProofCalldata: Dispatch<SetStateAction<ZKProofCalldata | null>>;
  nullifyProofCalldata: () => void;
}

const generateProof = async (signals: InputSignals | undefined) => {
  if (!signals) {
    throw new Error('No signals');
  }

  const checks = {
    'Initial grid': signals.initialGrid,
    'Final grid': signals.finalGrid,
    Account: signals.account,
    'Selected functions': signals.selectedFunctionsIndexes,
  };

  for (const [name, value] of Object.entries(checks)) {
    if (!value) {
      throw new Error(`${name} is not ready`);
    }
  }

  const { proof, publicSignals } = await generateGroth16Proof(
    signals,
    '/zk/zkube.wasm',
    '/zk/zkube_final.zkey'
  );

  const success = await verifyGroth16Proof(
    await import('../../public/zk/zkube_verification_key.json'),
    publicSignals,
    proof
  );

  if (!success) {
    throw new Error('Proof verification failed');
  }

  return generateGroth16ProofCalldataParsed(proof, publicSignals);
};

interface ProofGenerationContextType extends ProofCalldataContextType {
  loading: boolean;
  error: Error | null;
  generateAndVerifyProof: () => Promise<ZKProofCalldata | undefined>;
}

const ProofContext = createContext<ProofGenerationContextType | undefined>(
  undefined
);

export function ProofContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [proofCalldata, setProofCalldata] = useState<ZKProofCalldata | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { address } = usePrivyWalletAddress();
  const { inputSignals } = useInputSignals(address ?? zeroAddress);
  const { id, puzzleSet } = useRouteParams();

  const nullifyProofCalldata = useCallback(() => {
    setProofCalldata(null);
  }, []);

  useEffect(() => {
    setError(null);
    setProofCalldata(null);
  }, [id, puzzleSet, inputSignals]);

  const generateAndVerifyProof = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateProof(inputSignals);
      setProofCalldata(result);
      return result;
    } catch (e) {
      const error = (e as Error).message.includes('ForceEqualIfEnabled_50')
        ? new Error('❌ Wrong answer ❌')
        : (e as Error);
      setError(error);
      setProofCalldata(null);
      return;
    } finally {
      setLoading(false);
    }
  }, [inputSignals]);

  return (
    <ProofContext.Provider
      value={{
        proofCalldata,
        setProofCalldata,
        nullifyProofCalldata,
        loading,
        error,
        generateAndVerifyProof,
      }}
    >
      {children}
    </ProofContext.Provider>
  );
}

export function useProof() {
  const context = useContext(ProofContext);
  if (context === undefined) {
    throw new Error('useProof must be used within a ProofProvider');
  }
  return context;
}
