'use client'
import { useState } from "react";
import styles from "./styles/page.module.css";
import { GenerateProof } from "./zk/generateProof";
import { Proof } from "circuits";
import { Game } from "./components/Game";

export default function Page() {
  const [proof, setProof] = useState<Proof>();

  return (
    <div>
      <Game />
      <div className={styles.footer}>
        <h4>
          Blocks Left
          <br />
          <span>100</span>
        </h4>
        <h4>
          Score <br />
          <span>5</span>
        </h4>
      </div>

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
          [2, 2, 0, 0, 0, 0, 0, 0],
          [2, 1, 0, 0, 0, 0, 0, 0],
          [2, 2, 1, 0, 0, 0, 0, 0],
          [2, 2, 2, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ]}
        account={"0x0"}
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
        onResult={(result) => setProof(result)}
      />
    </div>
  );
}
