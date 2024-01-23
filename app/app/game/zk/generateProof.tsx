import { useProof } from './hooks/useProof';
import { InputSignals, Proof } from './types';
import styles from '../styles/actions.module.scss';

export function GenerateProof({
  inputSignals,
  onResult,
}: {
  inputSignals?: InputSignals;
  onResult: (proof: Proof) => void;
}) {
  const proofCallback = useProof('./zk/main.wasm', './zk/main_final.zkey');

  if (!inputSignals)
    return (
      <button disabled={true} className={styles.disabledButton}>
        Submit Solution
      </button>
    );

  const { initialGrid, finalGrid, account, selectedFunctionsIndexes } =
    inputSignals;

  return (
    <button
      disabled={
        !initialGrid || !finalGrid || !account || !selectedFunctionsIndexes
      }
      className={styles.submitButton}
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
          }).then((res) => {
            onResult(res);
          });
        }
      }}
    >
      Submit Solution
    </button>
  );
}
