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
import { useMemo } from 'react';
import { useClients } from './useClients';

type ContractWithWalletClient<TAbi extends Abi> = GetContractReturnType<
  TAbi,
  WalletClient,
  Address
>;

type ContractWithPublicClient<TAbi extends Abi> = GetContractReturnType<
  TAbi,
  PublicClient,
  Address
>;

function useContract<TAbi extends Abi, T extends boolean = false>(
  address: Address,
  abi: TAbi,
  withWalletClient: boolean = false
):
  | (T extends false
      ? ContractWithPublicClient<TAbi>
      : ContractWithWalletClient<TAbi>)
  | undefined {
  const { publicClient, walletClient } = useClients();

  return useMemo(() => {
    if (!withWalletClient) {
      return getContract({
        abi,
        address,
        client: { public: publicClient },
      }) as ContractWithPublicClient<typeof abi>;
    }

    if (!walletClient) return undefined;

    return getContract({
      abi,
      address,
      client: { public: publicClient, wallet: walletClient },
    }) as ContractWithWalletClient<typeof abi>;
  }, [address, abi, publicClient, walletClient, withWalletClient]);
}

export function useZkubeContract(withWalletClient: boolean = false) {
  return useContract(ZKUBE_ADDRESS, zKubeAbi, withWalletClient);
}

export function useZkubePuzzleSetContract() {
  return useContract(ZKUBE_PUZZLESET_ADDRESS, zKubePuzzleSetAbi);
}
