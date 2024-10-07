'use client';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { useEffect, useState } from 'react';
import { ContractFetchReturnType } from '../../types/Hooks';
import { OnChainPuzzle, Puzzle } from '../../types/Puzzle';
import { mapGrid } from '../../utils';
import { useZkubePuzzleSetContract } from '../useContract';

export const usePuzzleData = (
  puzzleId: string
): ContractFetchReturnType<Puzzle> => {
  const [response, setResponse] = useState<ContractFetchReturnType<Puzzle>>({
    loading: true,
    success: false,
    error: 'Loading puzzle...',
  });
  const zKubePuzzleSetContract = useZkubePuzzleSetContract();

  useEffect(() => {
    if (!zKubePuzzleSetContract || !puzzleId) {
      setResponse({ loading: false, success: false, error: 'Missing data' });
      return;
    }

    zKubePuzzleSetContract?.read
      .getPuzzle([BigInt(puzzleId)])
      .then((data) => {
        const base4Puzzle = convertPuzzleToBase4FromHex(data as OnChainPuzzle);
        setResponse({
          loading: false,
          success: true,
          data: {
            initialGrid: mapGrid(base4Puzzle.startingGrid, 4),
            finalGrid: mapGrid(base4Puzzle.finalGrid, 4),
            availableFunctions: base4Puzzle.availableFunctions.map(
              (functionId) => circuitFunctionsArray[functionId]
            ),
          },
        });
      })
      .catch((error) => {
        setResponse({
          loading: false,
          success: false,
          error: (error as Error).message,
        });
      });
  }, [puzzleId, zKubePuzzleSetContract?.address]);

  return response;
};
