'use client';
import { Game } from '@/src/types/Game';
import styles from '../../styles/games.module.scss';
import { useContext } from 'react';
import { useContract } from '@/src/hooks/useContract';
import { GamesContext } from '@/src/context/GamesContext';
import { truncateAddress } from '@/src/utils/truncateAddress';

export function GamesTable({ prefetchedGames }: { prefetchedGames: Game[] }) {
  let { games } = useContext(GamesContext);

  const { joinGame } = useContract();

  if (games.length === 0) {
    games = prefetchedGames;
  }

  const availableGames = games.filter(game => game.player2 == null)

  return (
    <table className={styles.availableGames}>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Player 1</th>
          <th>Puzzle Set</th>
          <th>Interval (blocks)</th>
          <th>Number of Puzzles</th>
          <th></th>
        </tr>
        {availableGames.map((game) => (
          <tr key={game.id} className={styles.game}>
            <td>{game.id}</td>
            <td>{truncateAddress(game.player1)}</td>
            <td>{truncateAddress(game.puzzleSet)}</td>
            <td>{game.interval}</td>
            <td>{game.numberOfTurns}</td>
            <td>
              <button onClick={async () => {
                const result = await joinGame(BigInt(game.id));
                if (result.success) {
                  alert('joined game');
                } else {
                  alert('failed to join game');
                }
              }}>join</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
