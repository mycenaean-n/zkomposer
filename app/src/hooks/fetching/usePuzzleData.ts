'use client';
import { useEffect, useState } from 'react';
import { OnChainPuzzle, Puzzle } from '../../types/Puzzle';
import { useZkubePuzzleSetContract } from '../useContract';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { mapGrid } from '../../utils';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { ContractFetchReturnType } from '../../types/fetch.types';

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
            initialGrid: mapGrid(base4Puzzle.startingGrid),
            finalGrid: mapGrid(base4Puzzle.finalGrid),
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
  }, [puzzleId, zKubePuzzleSetContract]);

  return response;
};
