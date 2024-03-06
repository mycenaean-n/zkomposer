'use client';
import { Game } from '@/src/types/Game';
import { gql, useSubscription } from '@apollo/client';
import styles from '../../styles/games.module.scss';
import { useEffect, useState } from 'react';
import { useContract } from '@/src/hooks/useContract';

const GAMES_SUBSCRIPTION = gql`
  subscription OnGameUpdate {
    games {
      id
      interval
      numberOfTurns
      player1
      player2
      puzzleSet
      startingBlock
    }
  }
`;

export function GamesTable({ games }: { games: Game[] }) {
  const { data } = useSubscription<{games: Game[]}>(GAMES_SUBSCRIPTION);

  const { joinGame } = useContract();

  if (data) {
    games = data.games;
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
            <td>{game.player1}</td>
            <td>{game.puzzleSet}</td>
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
