'use client';
import { Game } from '@/src/types/Game';
import { ApolloProvider, gql, useSubscription } from '@apollo/client';
import styles from '../../styles/lobbies.module.scss';
import { useEffect } from 'react';

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

export function LobbiesTable({ lobbies }: { lobbies: Game[] }) {
  const {data, loading, error } = useSubscription(GAMES_SUBSCRIPTION);
  
  useEffect(() => {
    if (!loading) {
      lobbies = data as Game[];
    }
  }, [data, loading])
  console.log(lobbies)
  console.log(loading)
  console.log(data)
  console.log(error)
  return (
    <table className={styles.availableLobbies}>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Player 1</th>
          <th>Puzzle Set</th>
          <th>Interval (blocks)</th>
          <th>Stake</th>
          <th></th>
        </tr>
        {lobbies.map((lobby) => (
          <tr key={lobby.id} className={styles.lobby}>
            <td>{lobby.id}</td>
            <td>{lobby.player1}</td>
            <td>{lobby.puzzleSet}</td>
            <td>{lobby.interval}</td>
            <td>{lobby.stake}</td>
            <td>
              <button>join</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
