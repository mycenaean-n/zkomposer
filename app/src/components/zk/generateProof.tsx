import { useProof } from '../../hooks/useProof';
import { ZKProof } from '../../types/Proof';
import styles from '../../styles/actions.module.scss';
import { InputSignals } from 'circuits/types/proof.types';

export function GenerateProof({
  inputSignals,
  onResult,
}: {
  inputSignals?: InputSignals;
  onResult: (proof: ZKProof) => void;
}) {
  const proofCallback = useProof('/zk/zkube.wasm', '/zk/zkube_final.zkey');

  if (!inputSignals)
    return (
      <button disabled={true} className={styles.disabledButton}>
        Submit Solution
      </button>
    );

  const {
    initialGrid,
    finalGrid,
    account,
    selectedFunctionsIndexes,
    availableFunctionsIndexes,
  } = inputSignals;

  return (
    <button
      className="bg-btn-gray p-2 rounded-sm w-full cursor-pointer z-100"
      disabled={
        !initialGrid ||
        !finalGrid ||
        !account ||
        !selectedFunctionsIndexes ||
        !availableFunctionsIndexes
      }
      onClick={async () => {
        if (!initialGrid) alert('Initial grid is not ready');
        else if (!finalGrid) alert('finalGrid is not ready');
        else if (!account) alert('account is not ready');
        else if (!selectedFunctionsIndexes)
          alert('selectedFunctionsIndexes is not ready');
        else {
          proofCallback({
            initialGrid,
            finalGrid,
            account,
            selectedFunctionsIndexes,
            availableFunctionsIndexes,
          }).then((res) => {
            onResult(res as unknown as ZKProof);
          });
        }
      }}
    >
      Submit Solution
    </button>
  );
}
