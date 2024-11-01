'use client';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { useMemo } from 'react';
import { mapGrid } from '../utils';
import { useReadContractPuzzleSet } from './useReadContract';

export const usePuzzleData = (puzzleId: string) => {
  const { data, isLoading, error } = useReadContractPuzzleSet('getPuzzle', [
    BigInt(puzzleId),
  ]);

  const parsedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const base4Puzzle = convertPuzzleToBase4FromHex(data);
    return {
      initialGrid: mapGrid(base4Puzzle.startingGrid),
      finalGrid: mapGrid(base4Puzzle.finalGrid),
      availableFunctions: base4Puzzle.availableFunctions.map(
        (functionId) => circuitFunctionsArray[functionId]
      ),
    };
  }, [data]);

  return { data: parsedData, isLoading, error };
};
