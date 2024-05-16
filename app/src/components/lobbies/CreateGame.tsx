'use client';
import { useZkubeContract } from '@/src/hooks/useContract';
import { useState } from 'react';
import styles from '../../styles/createGame.module.scss';
import { ZKUBE_PUZZLESET_ADDRESS } from '@/src/config';

export function CreateGame() {
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);
  const [puzzleSet, setPuzzleSet] = useState<string>(ZKUBE_PUZZLESET_ADDRESS);
  const [interval, setInterval] = useState<number>(0);
  const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
  const { createGame } = useZkubeContract();

  function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setInputsShowing(false);
    }
  }

  return (
    <div className={styles.createGame}>
      {!inputsShowing && (
        <button
          onClick={() => {
            setInputsShowing(true);
          }}
        >
          create game
        </button>
      )}
      {inputsShowing && (
        <div className={styles.inputsContainer} onClick={onInputContainerClick}>
          <div className={styles.inputs}>
            <div>
              <input
                placeholder="contract address"
                type="text"
                value={puzzleSet}
                onChange={(e) => setPuzzleSet(e.target.value)}
              />
              <h4>puzzle set</h4>
            </div>
            <div>
              <input
                type="number"
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value))}
              />
              <h4>interval (blocks)</h4>
            </div>
            <div>
              <input
                type="number"
                value={numberOfTurns}
                onChange={(e) => setNumberOfTurns(parseInt(e.target.value))}
              />
              <h4>number of puzzles</h4>
            </div>

            <button
              onClick={async () => {
                if (!createGame) return;
                const result = await createGame(
                  puzzleSet,
                  interval,
                  numberOfTurns
                );
                if (result && result.success == true) {
                  setInputsShowing(false);
                }
              }}
            >
              create game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
