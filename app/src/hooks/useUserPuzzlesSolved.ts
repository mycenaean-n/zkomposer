import { gql, useQuery } from '@apollo/client';
import { Address, checksumAddress } from 'viem';

const USER_PUZZLES_SOLVED = gql`
  query UserPuzzlesSolved($userId: String!, $puzzleSet: String!) {
    users(where: { id_eq: $userId }) {
      id
      totalSolved
      solutions(where: { puzzleSet_eq: $puzzleSet }) {
        blockNumber
        id
        puzzleId
        puzzleSet
      }
    }
  }
`;

export function useUserPuzzlesSolved(
  address: Address | undefined,
  puzzleSet: Address
) {
  const { data, loading, error } = useQuery<{
    users: [
      {
        id: Address;
        solutions: {
          id: Address;
          puzzleId: string;
          puzzleSet: Address;
        }[];
      },
    ];
  }>(USER_PUZZLES_SOLVED, {
    variables: {
      userId: address ? checksumAddress(address) : '',
      puzzleSet: checksumAddress(puzzleSet),
    },
    fetchPolicy: 'cache-and-network', // Ensures cache data is used first, then refetches
    skip: !address,
  });

  return {
    user: data?.users[0],
    loading,
    error,
  };
}
