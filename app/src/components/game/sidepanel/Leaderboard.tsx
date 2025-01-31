import { Address } from 'viem';
import { usePrivyWalletAddress } from '../../../hooks/privy/usePrivyWalletAddress';
import { useUserLeaderboard } from '../../../hooks/useUserLeaderboard';
import { truncateAddress } from '../../../utils/truncateAddress';

type LeaderboardProps = {
  puzzleSet: Address | null;
  puzzleId: string | null;
};

export function Leaderboard({ puzzleSet, puzzleId }: LeaderboardProps) {
  const { users, loading } = useUserLeaderboard(puzzleSet, 5);
  const { address } = usePrivyWalletAddress();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Address</th>
            <th className="text-right">Solved</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{truncateAddress(user.id)}</td>
              <td className="text-right">{user.totalSolvedInPuzzleSet}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div>Loading...</div>}
    </div>
  );
}
