import { useEffect, useState } from 'react';
import { useContractWriteZKube } from '../useContractWrite';
import { useReadContractPuzzleSet } from '../useReadContract';
import { useRouteParams } from '../useRouteChange';
import { useUserLeaderboard } from '../useUserLeaderboard';

export function useContractInteractions() {
  const { puzzleSet } = useRouteParams();
  const { fetchLeaderboard } = useUserLeaderboard(puzzleSet, 20);
  const {
    callback: submitSolution,
    error: submitSolutionError,
    isConfirmed,
  } = useContractWriteZKube('submitSolution');
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
    }
  }, [isConfirmed]);

  return { submitSolution, puzzlesInSet, error, setError };
}
