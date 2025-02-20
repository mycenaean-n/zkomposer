import { useEffect, useState } from 'react';
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
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (
      submitSolutionError?.message.includes('The total cost (gas * gas fee')
    ) {
      setError(new Error('Click "Faucet", get money'));
    } else {
      setError(submitSolutionError);
    }
  }, [submitSolutionError]);

  useEffect(() => {
    if (isConfirmed) {
      fetchLeaderboard();
      fetchUserPuzzles();
    }
  }, [isConfirmed]);

  return { submitSolution, puzzlesInSet, error, setError, isConfirming };
}
