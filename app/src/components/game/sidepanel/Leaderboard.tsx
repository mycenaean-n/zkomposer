import clsx from 'clsx';
import { Address } from 'viem';
import { usePrivyWalletAddress } from '../../../hooks/usePrivyWalletAddress';
import { useUserLeaderboard } from '../../../hooks/useUserLeaderboard';
import { hasSubmittedPuzzle } from '../../../utils/hasSubmittedPuzzle';
import { truncateAddress } from '../../../utils/truncateAddress';

type LeaderboardProps = {
  puzzleSet: Address | null;
  puzzleId: string | null;
};

export function Leaderboard({ puzzleSet, puzzleId }: LeaderboardProps) {
  const { users } = useUserLeaderboard(puzzleSet, 20);
  const address = usePrivyWalletAddress();

  return (
    <div className="w-full overflow-y-auto">
      <table className="w-full table-fixed border-collapse rounded-lg bg-white shadow-sm">
        <caption className="mb-2 text-start text-lg font-semibold">
          Leaderboard
        </caption>
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="w-1/12 px-4 py-2 text-center text-sm font-semibold text-gray-600">
              #
            </th>
            <th className="w-3/12 px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Who
            </th>
            <th className="w-2/12 px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Solved
            </th>
            <th className="w-3/12 px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Current
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 20 }, (_, i) => {
            const user = users[i];
            return (
              <tr
                key={user?.id}
                className={clsx(
                  'h-8 transition-colors',
                  user && user.id === address && 'bg-gray-100'
                )}
              >
                {user ? (
                  <>
                    <td className="px-4 py-2 text-center text-sm text-gray-500">
                      {user && i + 1}
                    </td>
                    <td className="px-4 py-2 text-center text-sm font-medium text-gray-900">
                      {user?.id && truncateAddress(user.id)}
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-gray-500">
                      {user?.totalSolvedInPuzzleSet}
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-gray-500">
                      {hasSubmittedPuzzle(user, puzzleId) ? '✅' : '❌'}
                    </td>
                  </>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
