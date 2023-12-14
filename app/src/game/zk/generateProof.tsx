import { Proof, useProof } from "./hooks/useProof";

export function GenerateProof({
  initialGrid,
  finalGrid,
  account,
  selectedFunctions,
  onResult,
}: {
  initialGrid: number[][];
  finalGrid: number[][];
  account: string;
  selectedFunctions: number[][][];
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
