import { useEffect, useState } from 'react';
import { useContractWriteZKube } from '../useContractWrite';
import { useReadContractPuzzleSet } from '../useReadContract';

export function useContractInteractions() {
  const { callback: submitSolution, error: submitSolutionError } =
    useContractWriteZKube('submitSolution');
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

  return { submitSolution, puzzlesInSet, error, setError };
}
