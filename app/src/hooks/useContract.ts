import { createWalletClient, custom, getContract, isAddress } from 'viem';
import { abi } from '../abis/zKube';
import { useAccount, useClient } from 'wagmi';
import { ZKUBE_ADDRESS } from '../config';
import { getTransactionReceipt } from 'viem/actions';

type WriteResult = {
  txHash: `0x${string}`;
  success: boolean;
};

export function useContract() {
  if (!window.ethereum) {
    alert('please connect your wallet');
  }
  const publicClient = useClient();
  const walletClient = createWalletClient({
    chain: publicClient?.chain,
    transport: custom(window.ethereum),
  });
  const { address } = useAccount();
  if (!walletClient) {
    throw new Error('Wallet client not found');
  }

  const zKube = getContract({
    abi,
    address: ZKUBE_ADDRESS,
    client: { public: publicClient, wallet: walletClient },
  });

  async function createGame(
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ): Promise<WriteResult> {
    if (isAddress(targetPuzzleSet)) {
      if (!address) {
        throw new Error('No address found');
      }
      const txHash = await zKube.write.createGame(
        [targetPuzzleSet, interval, numberOfTurns],
        { account: address, chain: walletClient.chain }
      );
      const receipt = await getTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash, success: receipt.status === 'success' };
    } else {
      alert('Invalid address');
      throw new Error('Invalid address');
    }
  }

  return { zKube, createGame };
}
