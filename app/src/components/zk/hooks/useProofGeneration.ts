import { generateGroth16Proof, verifyGroth16Proof } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';
import { useCallback, useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { useProof } from '../../../context/ProofContext';
import { usePrivyWalletAddress } from '../../../hooks/usePrivyWalletAddress';
import { generateGroth16ProofCalldataParsed } from '../../../hooks/useProof';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { useInputSignals } from './useInputSignal';

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
    await import('../../../../public/zk/zkube_verification_key.json'),
    publicSignals,
    proof
  );

  if (!success) {
    throw new Error('Proof verification failed');
  }

  return generateGroth16ProofCalldataParsed(proof, publicSignals);
};

export function useProofGeneration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const address = usePrivyWalletAddress() ?? zeroAddress;

  const { inputSignals: inputSignals, error: inputSignalError } =
    useInputSignals(address);
  const { id, puzzleSet } = useRouteParams();
  const { proofCalldata, setProofCalldata } = useProof();

  useEffect(() => {
    setError(inputSignalError);
  }, [inputSignalError]);

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
      throw error;
    } finally {
      setLoading(false);
    }
  }, [inputSignals]);

  return {
    loading,
    proofCalldata,
    generateAndVerifyProof,
    error,
  };
}
