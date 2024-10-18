import { useCallback } from 'react';
import { Address } from 'viem';
import { ContractCallbackReturnType } from '../../types/Hooks';
import { ZKProofCalldata } from '../../types/Proof';
import { StringNumberBI } from '../../types/Puzzle';
import { isNumberNumericStringBI } from '../../utils/isNumericString';
import { useZkubeContract } from '../useContract';

export function useVerifyPuzzleSolutionCallback() {
  const zKubeContract = useZkubeContract();

  return useCallback(
    async (
      puzzleSet: Address,
      puzzleId: StringNumberBI,
      proof: ZKProofCalldata,
      address: Address
    ): Promise<ContractCallbackReturnType> => {
      if (!isNumberNumericStringBI(puzzleId) || !zKubeContract) {
        return { success: false, error: 'Invalid arguments' };
      }

      try {
        await zKubeContract.read.verifyPuzzleSolution([
          puzzleSet,
          BigInt(puzzleId),
          proof,
          address,
        ]);

        return { success: true, data };
      } catch (error) {
        console.error(error);
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract]
  );
}
