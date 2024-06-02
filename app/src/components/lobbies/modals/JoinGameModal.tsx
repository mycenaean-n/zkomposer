import React from 'react';
import styles from '../../../styles/createGame.module.scss';
import { useState } from 'react';
import { OnChainGame } from '../../../types/Game';
import { useJoinGameCallback } from '../../../hooks/callbacks/useJoinGameCallback';

export function JoinGameModal({
  setInputsShowing,
  game,
  gameId,
}: {
  setInputsShowing: (showing: boolean) => void;
  game: OnChainGame;
  gameId: string;
}) {
  const joinGameCallback = useJoinGameCallback();
  const [joined, setJoined] = useState(false);

  async function joinGame() {
    if (!joinGameCallback) return;
    const result = await joinGameCallback(BigInt(gameId));
    if (result.success) {
      setJoined(true);
    } else {
      alert('failed to join game');
    }
  }

  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputs}>
        {!joined ? (
          <>
            <div className="flex justify-between">
              <h4>Opponent</h4>
              <input
                className="text-black"
                type="text"
                value={game.player1.address_}
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
                value={game.numberOfRounds}
                disabled={true}
              />
            </div>
            <button onClick={joinGame}>Join Game</button>
          </>
        ) : (
          <div>Joined </div>
        )}
      </div>
    </div>
  );
}
