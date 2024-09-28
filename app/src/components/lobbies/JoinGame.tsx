import { useJoinGameCallback } from '@hooks/callbacks/useJoinGameCallback';
import { useRouter } from 'next/navigation';
import { Game } from '../../types/Game';
import { Button } from '../ui/Button';

export function JoinGame({ game, gameId }: { game: Game; gameId: string }) {
  const joinGameCallback = useJoinGameCallback();
  const router = useRouter();
  const joinGame = async () => {
    if (!joinGameCallback) return;
    const { success } = await joinGameCallback(BigInt(gameId));
    if (!success) {
      alert('failed to join game');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <h4>Opponent</h4>
        <div>{game.player1}</div>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <h4>Puzzle Set</h4>
        <div>{game.puzzleSet}</div>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <h4>Round duration (blocks)</h4>
        <div>{game.interval}</div>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <h4>Number of Rounds</h4>
        <div>{game.numberOfTurns}</div>
      </div>
      <div className="mx-auto flex gap-4">
        <Button variant="secondary" onClick={joinGame}>
          Accept
        </Button>
        <Button rounded variant="primary">
          Decline
        </Button>
      </div>
    </div>
  );
}
