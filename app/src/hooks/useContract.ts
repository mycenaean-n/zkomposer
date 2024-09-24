import { useMemo } from 'react';
import {
  Abi,
  Address,
  getContract,
  GetContractReturnType,
  PublicClient,
  WalletClient,
} from 'viem';
import { abi as zKubeAbi } from '../abis/zKube';
import { abi as zKubePuzzleSetAbi } from '../abis/zKubePuzzleSet';
import { ZKUBE_ADDRESS, ZKUBE_PUZZLESET_ADDRESS } from '../config';
import { useClients } from './useClients';

export function useContract<TAbi extends Abi, T extends boolean = false>(
  address: Address,
  abi: TAbi,
  withWalletClient: T
): T extends true
  ? GetContractReturnType<TAbi, WalletClient, Address>
  : GetContractReturnType<TAbi, PublicClient, Address> {
  const { publicClient, walletClient } = useClients();

  const contract = useMemo(() => {
    if (walletClient && withWalletClient) {
      return getContract({
        address,
        abi,
        client: {
          public: publicClient,
          wallet: walletClient,
        },
      }) as GetContractReturnType<TAbi, WalletClient, Address>;
    }

    return getContract({
      address,
      abi,
      client: publicClient,
    }) as GetContractReturnType<TAbi, PublicClient, Address>;
  }, [address, publicClient.chain.id]);

  return contract;
}

export function useZkubeContract(withWalletClient: boolean = false) {
  return useContract(ZKUBE_ADDRESS, zKubeAbi, withWalletClient);
}

export function useZkubePuzzleSetContract(withWalletClient: boolean = false) {
  return useContract(
    ZKUBE_PUZZLESET_ADDRESS,
    zKubePuzzleSetAbi,
    withWalletClient
  );
}
