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
  await serverClient.clearStore()
  const { data } = await serverClient.query<{games: Game[]}>({ query: GAMES_QUERY, fetchPolicy: 'network-only'});
  const games = data.games
  console.log(games)
  return games;
}
