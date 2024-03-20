import styles from '../../styles/games.module.scss';
import { CreateGame } from './CreateGame';
import { GameStarting } from './GameStarting';
import { GamesTable } from './GamesTable';
import { getGames } from './getGames';

export async function Games() {
  const games = await getGames();

  return (
    <div id="games" className={styles.games}>
      <h1>Available Games</h1>
      <div className={styles.createGame}>
        <CreateGame />
      </div>
      <div className={styles.tableContainer}>
        <GamesTable prefetchedGames={games} />
      </div>
      <GameStarting />
    </div>
  );
}
