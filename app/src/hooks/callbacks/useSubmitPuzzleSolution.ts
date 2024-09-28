import { useCallback } from 'react';
import { Address, zeroAddress } from 'viem';
import { useChainId, useChains } from 'wagmi';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../config';
import { GameMode } from '../../types/Game';
import { ContractCallbackReturnType } from '../../types/Hooks';
import { ZKProof } from '../../types/Proof';
import { StringNumberBI } from '../../types/Puzzle';
import { isNumberNumericStringBI } from '../../utils/isNumericString';
import { useZkubeContract } from '../useContract';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';

interface SubmitPuzzleSolutionCallbackResult {
  solved: boolean;
  error: string | undefined;
}

export function useSubmitPuzzleSolutionCallback(
  gameMode: GameMode,
  id: string | undefined
) {
  const submitPuzzleCallback = useSubmitPuzzleCallback();
  const verifyPuzzleSolutionCallback = useVerifyPuzzleSolutionCallback();
  const address = usePrivyWalletAddress() ?? zeroAddress;

  return useCallback(
    async (
      result: ZKProof
    ): Promise<SubmitPuzzleSolutionCallbackResult | undefined> => {
      if (gameMode === 'multiplayer' && id && submitPuzzleCallback) {
        const { success, error } = await submitPuzzleCallback(
          BigInt(id),
          result
        );

        return { solved: success, error };
      }
      if (gameMode === 'singleplayer' && id && verifyPuzzleSolutionCallback) {
        const { success, error } = await verifyPuzzleSolutionCallback(
          ZKUBE_PUZZLESET_ADDRESS,
          BigInt(id),
          result,
          address
        );
        return { solved: success, error };
      }
    },
    [gameMode, id, address, verifyPuzzleSolutionCallback, submitPuzzleCallback]
  );
}

function useSubmitPuzzleCallback() {
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

        return { success: true, error: undefined, data: undefined };
      } catch (error) {
        console.error('Error submitting puzzle solution', error);
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract?.address, address, chainId]
  );
}

function useVerifyPuzzleSolutionCallback() {
  const zKubeContract = useZkubeContract();
  const chainId = useChainId();

  return useCallback(
    async (
      puzzleSet: Address,
      puzzleId: StringNumberBI,
      proof: ZKProof,
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

        return { success: true, error: undefined, data: undefined };
      } catch (error) {
        console.error(error);
        return { success: false, error: (error as Error).message };
      }
    },
    [zKubeContract?.address, chainId]
  );
}
