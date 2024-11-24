import { getCircuitFunctionIndex } from 'circuits';
import { AVAILABLE_CIRCUITS } from 'circuits/config';
import { useMemo, useState } from 'react';
import { Address } from 'viem';
import { usePuzzleContext } from '../../../context/PuzzleContext';

export function useInputSignals(address: Address) {
  const { initConfig, functions } = usePuzzleContext();
  const [error, setError] = useState<Error | null>(null);

  const inputSignals = useMemo(() => {
    if (!initConfig) {
      setError(new Error('No init config'));
      return;
    }

    if (!functions) {
      setError(new Error('No puzzle functions available'));
      return;
    }

    console.log(functions.chosen.length, AVAILABLE_CIRCUITS);

    if (functions.chosen.length > AVAILABLE_CIRCUITS) {
      setError(new Error(`More than ${AVAILABLE_CIRCUITS} functions chosen`));
      return;
    }

    if (!functions.chosen || !functions.available) {
      setError(new Error('No puzzle functions available'));
      return;
    }

    setError(null);
    return {
      initialGrid: initConfig.initialGrid,
      finalGrid: initConfig.finalGrid,
      account: address,
      selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
      availableFunctionsIndexes: getCircuitFunctionIndex(functions.available),
    };
  }, [functions, address, initConfig]);

  return { inputSignals, error };
}
