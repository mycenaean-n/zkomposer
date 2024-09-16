import { useProof } from '@hooks/useProof';
import { ZKProof } from 'types/Proof';
import { InputSignals } from 'circuits/types/proof.types';
import { useState } from 'react';

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

  return (
    <button
      className="btn-primary-rounded w-full"
      disabled={
        !initialGrid ||
        !finalGrid ||
        !account ||
        !selectedFunctionsIndexes ||
        !availableFunctionsIndexes ||
        generatingProof
      }
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
      {generatingProof ? (
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-gray-100"></div>
      ) : (
        'Submit Solution'
      )}
    </button>
  );
}
