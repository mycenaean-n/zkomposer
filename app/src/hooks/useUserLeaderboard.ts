import { gql, useQuery } from '@apollo/client';
import { Address, checksumAddress } from 'viem';

const USER_LEADERBOARD = gql`
  query UserLeaderboard($puzzleSet: String!, $take: Int!) {
    users(orderBy: totalSolved_DESC_NULLS_LAST, limit: $take) {
      id
      totalSolved
      solutions(where: { puzzleSet_eq: $puzzleSet }) {
        id
        puzzleId
        puzzleSet
      }
    }
  }
`;

interface UserLeaderboardData {
  users: {
    totalSolved: number;
    id: Address;
    solutions: {
      id: Address;
      puzzleId: string;
      puzzleSet: Address;
    }[];
  }[];
}

interface ParsedUser {
  id: Address;
  totalSolved: number;
  totalSolvedInPuzzleSet: number;
  solutions: {
    id: Address;
    puzzleId: string;
    puzzleSet: Address;
  }[];
}

export function useUserLeaderboard(
  puzzleSet: Address | null,
  take: number = 5,
  enabled: boolean = true
) {
  const queryResult = useQuery<UserLeaderboardData>(USER_LEADERBOARD, {
    variables: {
      puzzleSet: puzzleSet ? checksumAddress(puzzleSet) : '',
      take,
    },
    skip: !puzzleSet || !enabled,
  });

  const parseUsers = (data?: UserLeaderboardData): ParsedUser[] => {
    if (!data) return [];
    return data.users.map((user) => ({
      ...user,
      totalSolvedInPuzzleSet: user.totalSolved,
    }));
  };

  const fetchLeaderboard = async (
    customTake?: number
  ): Promise<ParsedUser[]> => {
    if (!puzzleSet) throw new Error('PuzzleSet address is required');

    const result = await queryResult.refetch({
      puzzleSet: checksumAddress(puzzleSet),
      take: customTake ?? take,
    });

    return parseUsers(result.data);
  };

  return {
    users: parseUsers(queryResult.data),
    loading: queryResult.loading,
    error: queryResult.error,
    fetchLeaderboard,
    refetch: queryResult.refetch,
  };
}
