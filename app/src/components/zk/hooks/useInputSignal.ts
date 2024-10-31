import { Colors, getCircuitFunctionIndex } from 'circuits';
import { AVAILABLE_CIRCUITS } from 'circuits/config';
import { useContext, useMemo, useState } from 'react';
import { Address } from 'viem';
import { PuzzleContext } from '../../game/puzzle/Puzzle';

export function useInputSignals(address: Address) {
  const { initConfig, functions } = useContext(PuzzleContext);
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
      initialGrid: initConfig.initialGrid as Colors[][],
      finalGrid: initConfig.finalGrid as Colors[][],
      account: address,
      selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
      availableFunctionsIndexes: getCircuitFunctionIndex(functions.available),
    };
  }, [functions, address, initConfig]);

  return { inputSignals, error };
}
