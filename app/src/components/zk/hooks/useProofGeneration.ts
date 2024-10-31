import { generateGroth16Proof, verifyGroth16Proof } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';
import { useState } from 'react';
import { generateGroth16ProofCalldataParsed } from '../../../hooks/useProof';
import { ZKProofCalldata } from '../../../types/Proof';

export function useProofGeneration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [proofCalldata, setProofCalldata] = useState<ZKProofCalldata | null>(
    null
  );

  const generateAndVerifyProof = async (signals: InputSignals | undefined) => {
    if (!signals) {
      setError(new Error('No signals'));
      return;
    }

    const checks = {
      'Initial grid': signals.initialGrid,
      'Final grid': signals.finalGrid,
      Account: signals.account,
      'Selected functions': signals.selectedFunctionsIndexes,
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
        signals,
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
  };

  return {
    loading,
    proofCalldata,
    generateAndVerifyProof,
    error,
  };
}
