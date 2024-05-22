import React from 'react';
import styles from '../../styles/createGame.module.scss';
import { useZkubeContract } from '@/src/hooks/useContract';
import { useState } from 'react';
import { ZKUBE_PUZZLESET_ADDRESS } from '@/src/config';
import { Game } from '../../types/Game';

export default function JoinGameModal({
  setInputsShowing,
  game,
}: {
  setInputsShowing: (showing: boolean) => void;
  game: Game;
}) {
  const { joinGame } = useZkubeContract();
  const [joined, setJoined] = useState(false);

  function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setInputsShowing(false);
    }
  }

  return (
    <div className={styles.inputsContainer} onClick={onInputContainerClick}>
      <div className={styles.inputs}>
        {!joined ? (
          <>
            <div className="flex justify-between">
              <h4>Opponent</h4>
              <input
                className="text-black"
                type="text"
                value={game.player1}
                disabled={true}
              />
            </div>
            <div className="flex justify-between">
              <h4>Puzzle Set</h4>
              <input
                className="text-black"
                type="text"
                value={game.puzzleSet}
                disabled={true}
              />
            </div>
            <div className="flex justify-between">
              <h4>Interval (blocks)</h4>
              <input
                className="text-black"
                type="number"
                value={game.interval}
                disabled={true}
              />
            </div>
            <div className="flex justify-between">
              <h4>Number of Puzzles</h4>
              <input
                className="text-black"
                type="number"
                value={game.numberOfTurns}
                disabled={true}
              />
            </div>

            <button
              onClick={async () => {
                if (!joinGame) return;
                const result = await joinGame(BigInt(game.id));
                if (result.success) {
                  setJoined(true);
                } else {
                  alert('failed to join game');
                }
              }}
            >
              Join Game
            </button>
          </>
        ) : (
          <div>Joined </div>
        )}
      </div>
    </div>
  );
}
