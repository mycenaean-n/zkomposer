import { useProof } from '@hooks/useProof';
import { InputSignals } from 'circuits/types/proof.types';
import { useState } from 'react';
import { ZKProof } from 'types/Proof';

export function GenerateProof({
  inputSignals,
  onResult,
  onError,
}: {
  inputSignals?: InputSignals;
  onResult: (proof: ZKProof) => void;
  onError: (err: string) => void;
}) {
  const proofCallback = useProof('/zk/zkube.wasm', '/zk/zkube_final.zkey');
  const [generatingProof, setGenerationgProof] = useState(false);

  if (!inputSignals) {
    return <button disabled={true}>Submit Solution</button>;
  }

  const {
    initialGrid,
    finalGrid,
    account,
    selectedFunctionsIndexes,
    availableFunctionsIndexes,
  } = inputSignals;

  const isAnySignalMissing = Object.values(inputSignals).some(
    (signal) => signal === null || signal === undefined
  );

  return (
    <button
      className="btn-transparent border- w-full rounded-md border p-1"
      disabled={isAnySignalMissing ?? generatingProof}
      onClick={async () => {
        if (!initialGrid) alert('Initial grid is not ready');
        else if (!finalGrid) alert('finalGrid is not ready');
        else if (!account) alert('account is not ready');
        else if (!selectedFunctionsIndexes) {
          alert('selectedFunctionsIndexes is not ready');
        } else {
          setGenerationgProof(true);
          proofCallback({
            initialGrid,
            finalGrid,
            account,
            selectedFunctionsIndexes,
            availableFunctionsIndexes,
          })
            .then((res) => {
              setGenerationgProof(false);
              onResult(res);
            })
            .catch((e) => {
              setGenerationgProof(false);
              onError(e.message);
            });
        }
      }}
    >
      Submit Solution
    </button>
  );
}
