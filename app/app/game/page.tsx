'use client';
import { useState } from 'react';
import styles from '../../src/styles/game.module.scss';
import { Game } from '../../src/components/game/Game';
import { Proof } from '../../src/types/Proof';

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
    </div>
  );
}
