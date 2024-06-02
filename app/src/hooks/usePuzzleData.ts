'use client';
import { useEffect, useState } from 'react';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { useZkubePuzzleSetContract } from './useContract';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { mapGrid } from '../utils';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';

export const usePuzzleData = (
  puzzleId: string
): { puzzle: Puzzle | undefined; loading: boolean } => {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [loading, setLoading] = useState<boolean>(true);
  const zKubePuzzleSetContract = useZkubePuzzleSetContract();

  useEffect(() => {
    if (!zKubePuzzleSetContract || !puzzleId) return;
    setLoading(true);
    zKubePuzzleSetContract?.read.getPuzzle([BigInt(puzzleId)]).then((data) => {
      const base4Puzzle = convertPuzzleToBase4FromHex(data as OnChainPuzzle);

      setPuzzle({
        initialGrid: mapGrid(base4Puzzle.startingGrid),
        finalGrid: mapGrid(base4Puzzle.finalGrid),
        availableFunctions: base4Puzzle.availableFunctions.map(
          (functionId) => circuitFunctionsArray[functionId]
        ),
      });
      setLoading(false);
    });
  }, [puzzleId, zKubePuzzleSetContract]);

  return { puzzle, loading };
};
