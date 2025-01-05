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

interface UserPuzzlesData {
  users: [
    {
      id: Address;
      totalSolved: number;
      solutions: {
        id: Address;
        puzzleId: string;
        puzzleSet: Address;
        blockNumber: number;
      }[];
    },
  ];
}

export function useUserPuzzlesSolved({
  address,
  puzzleSet,
}: {
  address: Address | undefined;
  puzzleSet: Address | null;
}) {
  const queryResult = useQuery<UserPuzzlesData>(USER_PUZZLES_SOLVED, {
    variables: {
      userId: address ? checksumAddress(address) : '',
      puzzleSet: puzzleSet ? checksumAddress(puzzleSet) : '',
    },
    skip: !address || !puzzleSet,
    fetchPolicy: 'cache-and-network',
  });

  const fetchUserPuzzles = async () => {
    if (!address || !puzzleSet)
      throw new Error('Address and puzzleSet are required');

    const result = await queryResult.refetch({
      userId: checksumAddress(address),
      puzzleSet: checksumAddress(puzzleSet),
    });

    return result.data?.users[0];
  };

  useWindowFocusRefetch(queryResult.refetch);

  return {
    user: queryResult.data?.users[0],
    loading: queryResult.loading,
    error: queryResult.error,
    fetchUserPuzzles,
  };
}
