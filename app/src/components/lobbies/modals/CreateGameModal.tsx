import React from 'react';
import styles from '../../../styles/createGame.module.scss';
import { useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '@/src/config';
import { useRouter } from 'next/navigation';
import { useCreteGameCallback } from '../../../hooks/callbacks/useCreateGameCallback';
import { Address } from 'viem';

export default function CreateGameModal({
  setInputsShowing,
}: {
  setInputsShowing: (showing: boolean) => void;
}) {
  const [puzzleSet, setPuzzleSet] = useState<Address>(ZKUBE_PUZZLESET_ADDRESS);
  const [interval, setInterval] = useState<number>(200);
  const [creatingGame, setCreatingGame] = useState(false);
  const { push } = useRouter();
  const [numberOfTurns, setNumberOfTurns] = useState<number>(3);
  const createGameCallback = useCreteGameCallback();

  function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setInputsShowing(false);
    }
  }

  async function createGameAction() {
    if (!createGameCallback || !puzzleSet) return;
    setCreatingGame(true);
    try {
      const result = await createGameCallback(
        puzzleSet,
        interval,
        numberOfTurns
      );
      if (result && result.success) {
        const route = `/game/${result.data?.gameId}`;
        push(route);
      }
      setCreatingGame(false);
    } catch (error) {
      setCreatingGame(false);
    }
  }

  return (
    <div className={styles.inputsContainer} onClick={onInputContainerClick}>
      <div className="align-center flex flex-col bg-black p-1 text-white">
        <div className="m-1 flex w-20 justify-between">
          <h4>Puzzle Set</h4>
          <input
            className="pl-1 text-black"
            type="text"
            value={puzzleSet}
            onChange={(e) => setPuzzleSet(e.target.value as Address)}
          />
        </div>
        <div className="flex justify-between">
          <h4>Interval (blocks)</h4>
          <input
            className="pl-1 text-black"
            type="number"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-between">
          <h4>Number of Puzzles</h4>
          <input
            className="pl-1 text-black"
            type="number"
            value={numberOfTurns}
            onChange={(e) => setNumberOfTurns(parseInt(e.target.value))}
          />
        </div>

        <button className="btn-primary-rounded w-40" onClick={createGameAction}>
          {creatingGame ? (
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-gray-800"></div>
          ) : (
            'Create Game'
          )}
        </button>
      </div>
    </div>
  );
}
