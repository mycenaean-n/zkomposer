import { useReadContractPuzzleSet } from './useReadContract';

export const useNumberOfPuzzlesInSet = () => {
  const { data, isLoading, error } = useReadContractPuzzleSet(
    'numberOfPuzzles',
    []
  );

  return { data, isLoading, error };
};
