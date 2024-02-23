import { getClient } from '@wagmi/core';
import { config } from '../providers/Web3Provider';
import { getContract } from 'viem';
import { abi } from '../abis/zKube';

export function useContract() {
  const client = getClient(config);
  if (!client) {
    throw new Error('Client not found');
  }

  const contract = getContract({
    abi,
    address: '0x3BC7e6383311c52C3D14cc3ca258B15253582Cac',
    client,
  });
  return { contract };
}
