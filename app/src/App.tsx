import { Proof } from "circuits";
import { useState } from "react";
import "./App.css";
import { GenerateProof } from "./components/GenerateProof";

function App() {
  const [proof, setProof] = useState<Proof>();
  return (
    <div className="App">
      <h2>Compute a zk proof</h2>
      <GenerateProof
        initialGrid={[
          [1, 1, 2, 0, 0, 0, 0, 0],
          [1, 2, 0, 0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0, 0, 0, 0],
          [1, 2, 0, 0, 0, 0, 0, 0],
          [1, 1, 2, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ]}
        finalGrid={[
          [2, 2, 2, 1, 0, 0, 0, 0],
          [2, 2, 1, 0, 0, 0, 0, 0],
          [2, 1, 0, 0, 0, 0, 0, 0],
          [2, 1, 0, 0, 0, 0, 0, 0],
          [2, 2, 1, 0, 0, 0, 0, 0],
          [2, 2, 2, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ]}
        account={"0x11"}
        selectedFunctions={[
          [
            [0, 1, 2],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [1, 1, 0],
          ],
        ]}
        onResult={setProof}
      />
    </div>
  );
}

export default App;
