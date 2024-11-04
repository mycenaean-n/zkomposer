import { gql, useQuery } from '@apollo/client';
import { Address, checksumAddress } from 'viem';
import { useWindowFocusRefetch } from './useWindowFocusRefetch';

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

type PuzzleSolvedProps = {
  address: Address | undefined;
  puzzleSet: Address | null;
};

export function useUserPuzzlesSolved({
  address,
  puzzleSet,
}: PuzzleSolvedProps) {
  const { data, loading, error, refetch } = useQuery<{
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
      puzzleSet: puzzleSet ? checksumAddress(puzzleSet) : '',
    },
    skip: !address || !puzzleSet,
    fetchPolicy: 'cache-and-network',
  });

  useWindowFocusRefetch(refetch);

  return {
    user: data?.users[0],
    loading,
    error,
  };
}
