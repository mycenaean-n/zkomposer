import styles from '../../styles/games.module.scss';
import { CreateGame } from './CreateGame';
import { GamesTable } from './GamesTable';
import { getGames } from './getGames';

export async function Lobbies() {
  const games = await getGames();

  return (
    <div id="games" className={styles.games}>
      <h1>Lobbies</h1>
      <div className={styles.createGame}>
        <CreateGame />
      </div>
      <GamesTable firstGames={games} />
    </div>
  );
}
