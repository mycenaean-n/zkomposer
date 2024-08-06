import React from 'react';
import { useRouter } from 'next/navigation';
import { OnChainGame } from 'types/Game';
import { useJoinGameCallback } from '@hooks/callbacks/useJoinGameCallback';

export function JoinGame({
  game,
  gameId,
}: {
  game: OnChainGame;
  gameId: string;
}) {
  const joinGameCallback = useJoinGameCallback();
  const router = useRouter();
  async function joinGame() {
    if (!joinGameCallback) return;
    const { success } = await joinGameCallback(BigInt(gameId));
    if (!success) {
      alert('failed to join game');
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-input-container">
          <h4>Opponent</h4>
          <input
            className="modal-input"
            type="text"
            value={game.player1.address_}
            disabled={true}
          />
        </div>
        <div className="modal-input-container">
          <h4>Puzzle Set</h4>
          <input
            className="modal-input"
            type="text"
            value={game.puzzleSet}
            disabled={true}
          />
        </div>
        <div className="modal-input-container">
          <h4>Round duration (blocks)</h4>
          <input
            className="modal-input"
            type="number"
            value={game.interval}
            disabled={true}
          />
        </div>
        <div className="modal-input-container">
          <h4>Number of Rounds</h4>
          <input
            className="modal-input"
            type="number"
            value={game.numberOfRounds}
            disabled={true}
          />
        </div>
        <div className="m-auto flex">
          <button
            className="btn-secondary-rounded mr-4 mt-4 w-32"
            onClick={joinGame}
          >
            Accept
          </button>
          <button
            className="btn-secondary-rounded mt-4 w-32"
            style={{ border: 'solid 3px red' }}
            onClick={() => router.push('/')}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
