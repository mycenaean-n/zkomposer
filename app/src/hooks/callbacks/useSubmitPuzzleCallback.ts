import { useCallback } from 'react';
import { useZkubeContract } from '../useContract';
import { ZKProof } from '../../types/Proof';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { useChainId, useChains } from 'wagmi';
import { StringNumberBI } from '../../types/Puzzle';
import { ContractCallbackReturnType } from '../../types/callbacks.types';

export function useSubmitPuzzleCallback() {
  const zKubeContract = useZkubeContract(true);
  const address = usePrivyWalletAddress();
  const chains = useChains();
  const chainId = useChainId();

  return useCallback(
    async (
      gameId: StringNumberBI,
      proof: ZKProof
    ): Promise<ContractCallbackReturnType> => {
      if (!address || !zKubeContract)
        return { success: false, error: 'address or zKubeContract missing' };
      try {
        await zKubeContract.write.submitPuzzle([BigInt(gameId), proof], {
          account: address,
          chain: chains[chainId],
        });

        return { success: true, error: undefined };
      } catch (error) {
        console.error('Error submitting puzzle solution', error);
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract, address, chains, chainId]
  );
}
