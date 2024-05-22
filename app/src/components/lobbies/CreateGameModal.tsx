import React, { useContext } from 'react';
import styles from '../../styles/createGame.module.scss';
import { useZkubeContract } from '@/src/hooks/useContract';
import { useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '@/src/config';
import { useRouter } from 'next/navigation';
import { GamesContext } from '../../context/GamesContext';

export default function CreateGameModal({
  setInputsShowing,
}: {
  setInputsShowing: (showing: boolean) => void;
}) {
  const [puzzleSet, setPuzzleSet] = useState<string>(ZKUBE_PUZZLESET_ADDRESS);
  const [interval, setInterval] = useState<number>(30);
  const { push } = useRouter();
  const [numberOfTurns, setNumberOfTurns] = useState<number>(3);
  const { createGame } = useZkubeContract();
  const { setLink } = useContext(GamesContext);

  function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setInputsShowing(false);
    }
  }

  async function createGameAction() {
    if (!createGame) return;
    const result = await createGame(puzzleSet, interval, numberOfTurns);
    if (result && result.success == true) {
      const route = `/game/${result.eventValues.gameId}`;
      push(route);
      setLink(window.location.origin + route);
    }
  }

  return (
    <div className={styles.inputsContainer} onClick={onInputContainerClick}>
      <div className={styles.inputs}>
        <div className="flex justify-between">
          <h4>Puzzle Set</h4>
          <input
            className="text-black"
            type="text"
            value={puzzleSet}
            onChange={(e) => setPuzzleSet(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <h4>Interval (blocks)</h4>
          <input
            className="text-black"
            type="number"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-between">
          <h4>Number of Puzzles</h4>
          <input
            className="text-black"
            type="number"
            value={numberOfTurns}
            onChange={(e) => setNumberOfTurns(parseInt(e.target.value))}
          />
        </div>

        <button
          className="bg-white text-black font-bold py-2 px-4 rounded "
          onClick={createGameAction}
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
