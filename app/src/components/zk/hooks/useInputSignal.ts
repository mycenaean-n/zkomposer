import { PuzzleFunctions } from '../../../types/Puzzle';

import { getCircuitFunctionIndex } from 'circuits';
import { AVAILABLE_CIRCUITS } from 'circuits/config';
import { useContext, useMemo, useState } from 'react';
import { Address } from 'viem';
import { PuzzleContext } from '../../game/puzzle/Puzzle';

export function useInputSignals(address: Address, functions: PuzzleFunctions) {
  const { initConfig } = useContext(PuzzleContext);
  const [error, setError] = useState<Error | null>(null);

  const inputSignals = useMemo(() => {
    if (!initConfig) {
      setError(new Error('No init config'));
      return;
    }

    if (functions.chosen.length > AVAILABLE_CIRCUITS) {
      setError(new Error(`More than ${AVAILABLE_CIRCUITS} functions chosen`));
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
