import { useCallback } from 'react';
import { ContractFunctionArgs, ContractFunctionName } from 'viem';
import { Config, useWriteContract } from 'wagmi';
import { WriteContractVariables } from 'wagmi/query';
import { abi as zKubeAbi } from '../abis/zKube';
import { ZKUBE_ADDRESS } from '../config';

type ZKubeAbi = typeof zKubeAbi;

export const useContractWriteZKube = <
  funName extends ContractFunctionName<ZKubeAbi, 'payable' | 'nonpayable'>,
>(
  functionName: funName
) => {
  const { writeContract, error, data: hash } = useWriteContract();

  const callback = useCallback(
    async <
      argsT extends ContractFunctionArgs<
        ZKubeAbi,
        'payable' | 'nonpayable',
        funName
      >,
    >(
      args: argsT,
      value?: bigint
    ) => {
      return writeContract<ZKubeAbi, funName, argsT, number>({
        address: ZKUBE_ADDRESS,
        abi: zKubeAbi,
        functionName,
        args,
        value,
      } as WriteContractVariables<ZKubeAbi, funName, argsT, Config, number>);
    },
    [writeContract, functionName]
  );

  return { callback, error, hash };
};
