import { Proof } from "circuits";
import { EdDSASignature } from "circuits/src/eddsa";
import useCircuit from "./hooks/useCircuit";

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
  onResult: (proof: Proof) => void;
}) {
  const { client } = useCircuit();
  return (
    <div>
      <button
        disabled={
          !client ||
          !initialGrid ||
          !finalGrid ||
          !account ||
          !selectedFunctions
        }
        onClick={async () => {
          if (!client) alert("Client is not ready");
          else if (!initialGrid) alert("Initial grid is not ready");
          else if (!finalGrid) alert("finalGrid is not ready");
          else if (!account) alert("account is not ready");
          else if (!selectedFunctions) alert("selectedFunctions is not ready");
          else {
            client
              .prove({
                initialGrid,
                finalGrid,
                account,
                selectedFunctions,
              })
              .then(onResult);
          }
        }}
      >
        Create zkp
      </button>
    </div>
  );
}
