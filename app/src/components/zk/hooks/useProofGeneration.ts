import { generateGroth16Proof, verifyGroth16Proof } from 'circuits';
import { useCallback, useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { useProofCalldata } from '../../../context/ProofContext';
import { usePrivyWalletAddress } from '../../../hooks/usePrivyWalletAddress';
import { generateGroth16ProofCalldataParsed } from '../../../hooks/useProof';
import { useRouteParams } from '../../../hooks/useRouteChange';
import { useInputSignals } from './useInputSignal';

export function useProofGeneration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const address = usePrivyWalletAddress() ?? zeroAddress;
  const { inputSignals: inputSignals, error: inputSignalError } =
    useInputSignals(address);
  const { proofCalldata, setProofCalldata } = useProofCalldata();
  const { id, puzzleSet } = useRouteParams();

  useEffect(() => {
    setError(inputSignalError);
  }, [inputSignalError]);

  useEffect(() => {
    setError(null);
    setProofCalldata(null);
  }, [id, puzzleSet, inputSignals]);

  const generateAndVerifyProof = useCallback(async () => {
    if (!inputSignals) {
      setError(new Error('No signals'));
      return;
    }

    const checks = {
      'Initial grid': inputSignals.initialGrid,
      'Final grid': inputSignals.finalGrid,
      Account: inputSignals.account,
      'Selected functions': inputSignals.selectedFunctionsIndexes,
    };

    for (const [name, value] of Object.entries(checks)) {
      if (!value) {
        alert(`${name} is not ready`);
        return;
      }
    }

    setLoading(true);
    try {
      const { proof, publicSignals } = await generateGroth16Proof(
        inputSignals,
        '/zk/zkube.wasm',
        '/zk/zkube_final.zkey'
      );

      const success = await verifyGroth16Proof(
        await import('../../../../public/zk/zkube_verification_key.json'),
        publicSignals,
        proof
      );

      setLoading(false);
      if (success) {
        const proofCalldata = await generateGroth16ProofCalldataParsed(
          proof,
          publicSignals
        );
        setProofCalldata(proofCalldata);
        setError(null);
      } else {
        setProofCalldata(null);
      }
    } catch (e) {
      if ((e as Error).message.includes('ForceEqualIfEnabled_50')) {
        setError(new Error('❌ Wrong answer ❌'));
      } else {
        setError(e as Error);
      }
      setProofCalldata(null);
    } finally {
      setLoading(false);
    }
  }, [inputSignals, inputSignalError, proofCalldata, setProofCalldata]);

  return {
    loading,
    proofCalldata,
    generateAndVerifyProof,
    error,
  };
}
