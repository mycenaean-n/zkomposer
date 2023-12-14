import { useProof } from "./hooks/useProof";
import { InputSignals, Proof } from "./types";

export function GenerateProof({
  inputSignals: { initialGrid, finalGrid, account, selectedFunctions },
  onResult,
}: {
  inputSignals: InputSignals;
  onResult: (proof: Proof | string) => void;
}) {
  const proofCallback = useProof(
    `${process.env.PUBLIC_URL}/main.wasm`,
    `${process.env.PUBLIC_URL}/main.zkey`
  );

  return (
    <div>
      <button
        disabled={!initialGrid || !finalGrid || !account || !selectedFunctions}
        onClick={async () => {
          if (!initialGrid) alert("Initial grid is not ready");
          else if (!finalGrid) alert("finalGrid is not ready");
          else if (!account) alert("account is not ready");
          else if (!selectedFunctions) alert("selectedFunctions is not ready");
          else {
            proofCallback({
              initialGrid,
              finalGrid,
              account,
              selectedFunctions,
            }).then((res) => {
              onResult(res);
            });
          }
        }}
      >
        Create zkp
      </button>
    </div>
  );
}
