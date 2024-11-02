import { gql, useQuery } from '@apollo/client';
import { Address, checksumAddress } from 'viem';

const USER_LEADERBOARD = gql`
  query UserLeaderboard($puzzleSet: String!, $take: Int!) {
    users(orderBy: totalSolved_DESC_NULLS_LAST, limit: $take) {
      id
      totalSolved
      solutions(where: { puzzleSet_eq: $puzzleSet }) {
        id
      }
    }
  }
`;

export function useUserLeaderboard(
  puzzleSet: Address | null,
  take: number = 5
) {
  const { data, loading, error } = useQuery<{
    users: {
      totalSolved: number;
      id: Address;
      solutions: {
        id: string;
      }[];
    }[];
  }>(USER_LEADERBOARD, {
    variables: {
      puzzleSet: checksumAddress(puzzleSet!),
      take,
    },
    skip: !puzzleSet,
  });

  const parsedUsers = data?.users.map((user) => ({
    ...user,
    totalSolvedInPuzzleSet: user.solutions.length,
  }));

  return {
    users: parsedUsers || [],
    loading,
    error,
  };
}
