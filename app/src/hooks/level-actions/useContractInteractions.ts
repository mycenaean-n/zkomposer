import { usePrivyWalletAddress } from '../privy/usePrivyWalletAddress';
import { useReadContractPuzzleSet } from '../useReadContractPuzzleSet';
import { useRouteParams } from '../useRouteChange';
import { useUserLeaderboard } from '../useUserLeaderboard';
import { useUserPuzzlesSolved } from '../useUserPuzzlesSolved';
import { useWriteContractZKube } from '../useWriteContractZKube';

export function useContractInteractions() {
  const { puzzleSet } = useRouteParams();
  const { address } = usePrivyWalletAddress();
  const { fetchUserPuzzles } = useUserPuzzlesSolved({
    address: address,
    puzzleSet: puzzleSet,
  });
  const { fetchLeaderboard } = useUserLeaderboard(puzzleSet, 20);
  const {
    callback: submitSolution,
    error: submitSolutionError,
    isConfirmed,
    isConfirming,
  } = useWriteContractZKube('submitSolution');
  const { data: puzzlesInSet } = useReadContractPuzzleSet('numberOfPuzzles');

  if (isConfirmed) {
    fetchLeaderboard();
    fetchUserPuzzles();
  }

  const formattedError = submitSolutionError?.message.includes(
    'The total cost (gas * gas fee'
  )
    ? new Error('Click "Faucet", get money')
    : submitSolutionError;

  return {
    submitSolution,
    puzzlesInSet,
    error: formattedError,
    isConfirming,
  };
}
