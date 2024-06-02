import { useCallback } from 'react';
import { useZkubeContract } from '../useContract';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { useChainId, useChains } from 'wagmi';
import { StringNumberBI } from '../../types/Puzzle';
import { ContractCallbackReturnType } from '../../types/callbacks.types';

export function useJoinGameCallback() {
  const zKubeContract = useZkubeContract(true);
  const address = usePrivyWalletAddress();
  const chains = useChains();
  const chainId = useChainId();

  return useCallback(
    async (gameId: StringNumberBI): Promise<ContractCallbackReturnType> => {
      if (!address || !zKubeContract)
        return { success: false, error: 'No address or contract available' };

      try {
        await zKubeContract.write.joinGame([BigInt(gameId)], {
          account: address,
          chain: chains[chainId],
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract, address, chains, chainId]
  );
}
