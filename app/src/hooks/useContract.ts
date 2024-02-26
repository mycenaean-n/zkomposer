import { getClient } from '@wagmi/core';
import { config } from '../providers/Web3Provider';
import { getContract, isAddress } from 'viem';
import { abi } from '../abis/zKube';
import { useAccount } from 'wagmi';

export function useContract() {
  const client = getClient(config);
  const { address } = useAccount();
  if (!client) {
    throw new Error('Client not found');
  }

  async function createGame(
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ) {
    if (isAddress(targetPuzzleSet)) {
      if (!address) {
        throw new Error('No address found');
      }

      await zKube.write.createGame([targetPuzzleSet, interval, numberOfTurns], {
        account: address,
      });
    } else alert('Invalid address');
  }

  const zKube = getContract({
    abi,
    address: '0x3BC7e6383311c52C3D14cc3ca258B15253582Cac',
    client,
  });
  return { zKube, createGame };
}
