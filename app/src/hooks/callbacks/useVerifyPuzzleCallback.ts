import { Address } from 'viem';
import { ZKProof } from '../../types/Proof';
import { useZkubeContract } from '../useContract';
import { useCallback } from 'react';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { StringNumberBI } from '../../types/Puzzle';
import { isNumberNumericStringBI } from '../../utils/isNumericString';
import { ContractCallbackReturnType } from './types';

export function useVerifyPuzzleSolutionCallback() {
  const zKubeContract = useZkubeContract();
  const address = usePrivyWalletAddress();

  return useCallback(
    async (
      puzzleSet: Address,
      puzzleId: StringNumberBI,
      proof: ZKProof
    ): Promise<ContractCallbackReturnType> => {
      if (!isNumberNumericStringBI(puzzleId) || !address || !zKubeContract) {
        return { success: false, error: 'Invalid arguments' };
      }

      try {
        await zKubeContract.read.verifyPuzzleSolution([
          puzzleSet,
          BigInt(puzzleId),
          proof,
          address,
        ]);

        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract, address]
  );
}
