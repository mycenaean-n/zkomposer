import { useProof } from '@hooks/useProof';
import { InputSignals } from 'circuits/types/proof.types';
import { useState } from 'react';
import { ZKProof } from 'types/Proof';
import { Button } from '../ui/Button';

interface GenerateProofProps {
  inputSignals?: InputSignals;
  onResult: (result: boolean) => void;
  onError: (err: string) => void;
  onClick: (proof: ZKProof) => void;
}

export function GenerateProof({
  inputSignals,
  onResult,
  onError,
  onClick,
}: GenerateProofProps) {
  const proofCallback = useProof('/zk/zkube.wasm', '/zk/zkube_final.zkey');
  const [generatingProof, setGenerationgProof] = useState(false);

  if (!inputSignals) {
    return (
      <Button
        className="min-h-9 w-full border border-black bg-gray-200 p-1"
        rounded={true}
        variant="primary"
        disabled={true}
      >
        Disabled
      </Button>
    );
  }

  const handleGenerateProof = async (signals: InputSignals) => {
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

    setGenerationgProof(true);
    try {
      const res = await proofCallback({ ...signals });
      setGenerationgProof(false);
      onClick(res);
    } catch (e) {
      setGenerationgProof(false);
      onError((e as Error).message);
    }
  };

  const isAnySignalMissing = Object.values(inputSignals).some(
    (signal) => signal === null || signal === undefined
  );

  return (
    <Button
      className="min-h-9 w-full border border-black p-1"
      rounded={true}
      variant="secondary"
      disabled={isAnySignalMissing || generatingProof}
      onClick={() => handleGenerateProof(inputSignals)}
    >
      Submit Solution
    </Button>
  );
}
