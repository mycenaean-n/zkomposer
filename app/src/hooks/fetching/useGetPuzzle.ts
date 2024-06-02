import { useMemo } from 'react';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { useZkubePuzzleSetContract } from '../useContract';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { StringNumberBI, OnChainPuzzle } from '../../types/Puzzle';
import { mapGrid } from '../../utils';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { isNumberNumericStringBI } from '../../utils/isNumericString';

export function useGetRandomPuzzleCallback(puzzleId: StringNumberBI) {
  const zKubePuzzleSetContract = useZkubePuzzleSetContract();
  const address = usePrivyWalletAddress();

  return useMemo(async () => {
    if (
      !address ||
      !isNumberNumericStringBI(puzzleId) ||
      !zKubePuzzleSetContract
    )
      return undefined;

    const hexPuzzle = await zKubePuzzleSetContract.read.getRandomPuzzle([
      BigInt(puzzleId),
    ]);

    const base4Puzzle = convertPuzzleToBase4FromHex(hexPuzzle as OnChainPuzzle);

    return {
      initialGrid: mapGrid(base4Puzzle.startingGrid),
      finalGrid: mapGrid(base4Puzzle.finalGrid),
      availableFunctions: base4Puzzle.availableFunctions.map(
        (functionId) => circuitFunctionsArray[functionId]
      ),
    };
  }, [zKubePuzzleSetContract, address, puzzleId]);
}
