import { Proof } from "circuits";
import { EdDSASignature } from "circuits/src/eddsa";
import useCircuit from "../hooks/useCircuitZKube";

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
  console.log({
    client,
    initialGrid,
    finalGrid,
    account,
    selectedFunctions,
  });

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
              .proveZKube({
                initialGrid,
                finalGrid,
                account,
                selectedFunctions,
              })
              .then((proof) => {
                console.log(proof);
                onResult(proof);
              });
          }
        }}
      >
        Create zkp
      </button>
    </div>
  );
}
