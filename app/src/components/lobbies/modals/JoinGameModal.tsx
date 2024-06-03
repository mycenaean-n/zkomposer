import React from 'react';
import { OnChainGame } from '../../../types/Game';
import { useJoinGameCallback } from '../../../hooks/callbacks/useJoinGameCallback';
import { useRouter } from 'next/navigation';

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
        <>
          <div className="modal-input">
            <h4>Opponent</h4>
            <input
              className="text-black"
              type="text"
              value={game.player1.address_}
              disabled={true}
            />
          </div>
          <div className="modal-input">
            <h4>Puzzle Set</h4>
            <input
              className="text-black"
              type="text"
              value={game.puzzleSet}
              disabled={true}
            />
          </div>
          <div className="modal-input">
            <h4>Interval (blocks)</h4>
            <input
              className="text-black"
              type="number"
              value={game.interval}
              disabled={true}
            />
          </div>
          <div className="modal-input">
            <h4>Number of Puzzles</h4>
            <input
              className="text-black"
              type="number"
              value={game.numberOfRounds}
              disabled={true}
            />
          </div>
          <div className="flex">
            <button
              className="btn-secondary-rounded mr-4 mt-4 w-32"
              onClick={joinGame}
            >
              Accept
            </button>
            <button
              className="btn-secondary-rounded mt-4 w-32"
              onClick={() => router.push('/')}
            >
              Decline
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
