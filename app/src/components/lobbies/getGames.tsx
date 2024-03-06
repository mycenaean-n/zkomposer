import { serverClient } from '@/src/clients/apollo';
import { Game } from '@/src/types/Game';
import { gql } from '@apollo/client';

const GAMES_QUERY = gql`
  query {
    games {
      id
      interval
      numberOfTurns
      player1
      puzzleSet
      startingBlock
      player2
    }
  }
`;

export async function getGames() {
  const { data } = await serverClient.query<{games: Game[]}>({ query: GAMES_QUERY, fetchPolicy: "no-cache" });
  const games = data.games
  return games;
}
