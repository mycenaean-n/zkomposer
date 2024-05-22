'use client';
import { useEffect, useState } from 'react';
import { Puzzle } from '../types/Puzzle';
import { usePuzzleSetContract } from './useContract';

export const useFetchPuzzleByPuzzleId = (
  puzzleId: string
): Puzzle | undefined => {
  // const [puzzle, setPuzzle] = useState<Puzzle>();
  // const { getPuzzle } = usePuzzleSetContract();

  // useEffect(() => {
  //   if (!getPuzzle) return;
  //   getPuzzle(BigInt(puzzleId)).then((data?: Puzzle) => setPuzzle(data));
  // }, [puzzleId, getPuzzle]);

  // console.log('puzzle', JSON.stringify(puzzle));
  return {
    initialGrid: [
      [1, 1, 2, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    finalGrid: [
      [2, 2, 2, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    availableFunctions: [
      'TRANSFORM_YELLOW_RED',
      'STACK_YELLOW',
      'TRANSFORMTWO_YELLOW_YELLOW_RED',
      'REJECT_YELLOW',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  };
};
