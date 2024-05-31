'use client';
import { useEffect, useState } from 'react';
import { Puzzle } from '../types/Puzzle';
import { usePuzzleSetContract } from './useContract';

export const usePuzzleData = (
  puzzleId: string
): { puzzle: Puzzle | undefined; loading: boolean } => {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [loading, setLoading] = useState<boolean>(true);
  const { getPuzzle } = usePuzzleSetContract();

  useEffect(() => {
    if (!getPuzzle) return;
    setLoading(true);
    getPuzzle(BigInt(puzzleId)).then((data?: Puzzle) => {
      setPuzzle(data);
      setLoading(false);
    });
  }, [puzzleId, getPuzzle]);

  return { puzzle, loading };
};
