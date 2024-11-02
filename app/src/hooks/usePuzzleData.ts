'use client';
import { useQuery } from '@tanstack/react-query';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { multicall } from 'wagmi/actions';
import { abi as PUZZLESET_ABI } from '../abis/zKubePuzzleSet';
import { ZKUBE_PUZZLESET_ADDRESS } from '../config';
import { wagmiConfig } from '../providers/Web3Provider';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { mapGrid } from '../utils';
import { useReadContractPuzzleSet } from './useReadContract';

type PuzzleWithId = Puzzle & { id: number };

const parsePuzzleData = (data: OnChainPuzzle | undefined, id: number) => {
  if (!data) {
    return undefined;
  }

  const base4Puzzle = convertPuzzleToBase4FromHex(data);
  return {
    id,
    initialGrid: mapGrid(base4Puzzle.startingGrid),
    finalGrid: mapGrid(base4Puzzle.finalGrid),
    availableFunctions: base4Puzzle.availableFunctions.map(
      (functionId) => circuitFunctionsArray[functionId]
    ),
  };
};

type UsePuzzleReturnType = {
  data: PuzzleWithId[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

const queryFunction = async (numberOfPuzzles: bigint) => {
  const contracts = Array.from({ length: Number(numberOfPuzzles) }, (_, i) => {
    return {
      address: ZKUBE_PUZZLESET_ADDRESS,
      abi: PUZZLESET_ABI,
      functionName: 'getPuzzle',
      args: [BigInt(i)],
    };
  });
  const results = await multicall(wagmiConfig, { contracts });
  const puzzles: PuzzleWithId[] | undefined = results
    .map((r, i) => parsePuzzleData(r.result as unknown as OnChainPuzzle, i))
    .filter(Boolean) as PuzzleWithId[] | undefined;

  return puzzles;
};

const usePuzzles = (): UsePuzzleReturnType => {
  const { data: numberOfPuzzles } = useReadContractPuzzleSet('numberOfPuzzles');
  const { data, isLoading, error } = useQuery<PuzzleWithId[] | undefined>({
    queryKey: ['puzzles'],
    queryFn: () => queryFunction(numberOfPuzzles!),
    enabled: !!numberOfPuzzles,
  });

  return { data, isLoading, error };
};

export const usePuzzleData = (puzzleId: string) => {
  const { data } = usePuzzles();
  return data?.find((puzzle) => puzzle.id === Number(puzzleId));
};
