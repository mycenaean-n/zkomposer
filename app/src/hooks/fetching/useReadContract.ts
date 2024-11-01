import { ContractFunctionArgs, ContractFunctionName } from 'viem';
import { useReadContract, UseReadContractParameters } from 'wagmi';
import { abi as PUZZLESET_ABI } from '../../abis/zKubePuzzleSet';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../config';

type PuzzleSetAbi = typeof PUZZLESET_ABI;

export const useReadContractPuzzleSet = <
  funName extends ContractFunctionName<PuzzleSetAbi, 'view' | 'pure'>,
  argsT extends ContractFunctionArgs<PuzzleSetAbi, 'view' | 'pure', funName>,
>(
  functionName: funName,
  args: argsT = [] as argsT
) => {
  return useReadContract<PuzzleSetAbi, funName, argsT>({
    abi: PUZZLESET_ABI,
    address: ZKUBE_PUZZLESET_ADDRESS,
    functionName,
    args,
  } as UseReadContractParameters<PuzzleSetAbi, funName, argsT>);
};
