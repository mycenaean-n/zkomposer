'use client';
import { GamesContext } from '@/src/context/GamesContext';
import { Game } from '@/src/types/Game';
import { useContext } from 'react';
import { useAccount, useBlockNumber } from 'wagmi';
import styles from '../../styles/gameStarting.module.scss';
import { useRouter } from 'next/navigation';

export function GameStarting() {
  let { games } = useContext(GamesContext);
  const router = useRouter();
  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { refetchInterval: 300 },
  });

  if (!blockNumber) return;

  function isGameStarting(game: Game): boolean {
    

    if (!blockNumber) throw new Error('blockNumber is not available');

    if (game.player2 == null || game.startingBlock == null) {
      return false;
    }

    if (blockNumber > game.startingBlock) {
      return false;
    }

    if (game.player1 != address && game.player2 != address) {
      return false;
    }

    return true
  }

  const startingGames = games.filter((game) => isGameStarting(game));

  return (
    <>
      {startingGames.length > 0 && (
        <div className={styles.gameStarting}>
          <div className={styles.card}>
            {startingGames.map((game) => (
              <>
                <h2 key={game.id}>
                  game #{game.id} starting in{' '}
                  {(BigInt(game.startingBlock) - blockNumber).toString()} blocks
                </h2>
                <button onClick={() => router.push(`/game/${game.id}`)}>
                  join
                </button>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
