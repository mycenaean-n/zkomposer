'use client';
import { Game } from '@/src/types/Game';
import { gql, useSubscription } from '@apollo/client';
import styles from '../../styles/games.module.scss';
import { useEffect, useState } from 'react';

const GAMES_SUBSCRIPTION = gql`
  subscription OnGameUpdate {
    games {
      id
      interval
      numberOfTurns
      player1
      player2
      puzzleSet
      stake
      startingBlock
    }
  }
`;

export function GamesTable({ firstGames }: { firstGames: Game[] }) {
  const [games, setGames] = useState<Game[]>(firstGames);
  const { data, loading, error } = useSubscription(GAMES_SUBSCRIPTION);

  useEffect(() => {
    if (!loading && data) {
      setGames(data.games);
    }
  }, [data, loading]);

  return (
    <table className={styles.availableGames}>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Player 1</th>
          <th>Puzzle Set</th>
          <th>Interval (blocks)</th>
          <th>Stake</th>
          <th></th>
        </tr>
        {games.map((game) => (
          <tr key={game.id} className={styles.game}>
            <td>{game.id}</td>
            <td>{game.player1}</td>
            <td>{game.puzzleSet}</td>
            <td>{game.interval}</td>
            <td>{game.stake}</td>
            <td>
              <button>join</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
