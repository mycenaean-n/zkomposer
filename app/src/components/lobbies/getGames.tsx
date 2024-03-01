import { client } from "@/src/clients/apollo";
import { Game } from "@/src/types/Game";
import { gql } from "@apollo/client";

const GAMES_QUERY = gql`
  query {
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

export async function getLobbies() {
  const {data} = await client.query({query: GAMES_QUERY})
  const lobbies = data.games as Game[];
  return lobbies
}