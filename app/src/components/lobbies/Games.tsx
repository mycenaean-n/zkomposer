import styles from '../../styles/lobbies.module.scss';
import { CreateGame } from './CreateGame';
import { LobbiesTable } from './GamesTable';
import { getLobbies } from './getGames';

export async function Lobbies() {
  const lobbies = await getLobbies();

  return (
    <div id="lobbies" className={styles.lobbies}>
      <h1>Lobbies</h1>
      <div className={styles.createGame}>
        <CreateGame />
      </div>
      <LobbiesTable lobbies={lobbies} />
      
    </div>
  );
}
