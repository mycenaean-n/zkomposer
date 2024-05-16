'use client';
import { useEffect, useState } from 'react';
import { Puzzle } from '../types/Puzzle';
import { usePuzzleSetContract } from './useContract';

export const useFetchPuzzleByPuzzleId = (
  puzzleId: string
): Puzzle | undefined => {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const { getPuzzle } = usePuzzleSetContract();

  useEffect(() => {
    if (!getPuzzle) return;
    getPuzzle(BigInt(puzzleId)).then((data?: Puzzle) => setPuzzle(data));
  }, [puzzleId, getPuzzle]);
  return puzzle;
};
