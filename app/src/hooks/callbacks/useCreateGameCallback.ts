import { useCallback } from 'react';
import { Address, decodeEventLog } from 'viem';
import { useChainId, useChains, usePublicClient } from 'wagmi';
import { ParsedGameSettingsData } from '../../components/lobbies/create-game-modal';
import { ContractCallbackReturnType } from '../../types/Hooks';
import { useBlockNumber } from '../useBlockNumber';
import { useZkubeContract } from '../useContract';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';

const CreatGameEventAbi = [
  {
    type: 'event',
    anonymous: false,
    name: 'GameCreated',
    inputs: [
      {
        type: 'uint256',
        name: 'gameId',
        indexed: true,
      },
      {
        type: 'address',
        name: 'puzzleSet',
        indexed: true,
      },
      {
        type: 'address',
        name: 'player1',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'interval',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'numberOfTurns',
        indexed: false,
      },
    ],
  },
];

type EventValues = {
  gameId: bigint;
  puzzleSet: Address;
  player1: Address;
  interval: bigint;
  numberOfTurns: bigint;
};

export function useCreteGameCallback() {
  const zKubeContract = useZkubeContract(true);
  const address = usePrivyWalletAddress();
  const chains = useChains();
  const chainId = useChainId();
  const blockNumber = useBlockNumber();
  const publicClient = usePublicClient();

  return useCallback(
    async ({
      puzzleSet,
      interval,
      turns,
    }: ParsedGameSettingsData): Promise<
      ContractCallbackReturnType<{
        gameId: bigint;
        puzzleSet: Address;
        player1: Address;
        interval: bigint;
        numberOfTurns: bigint;
      }>
    > => {
      if (!address || !zKubeContract || !blockNumber)
        return {
          success: false,
          error: 'address, zKubeContract or blockNumber missing',
        };

      console.log(
        chainId,
        zKubeContract.address,
        'zKubeContract.write.createGame'
      );

      const hash = await zKubeContract.write.createGame(
        [puzzleSet, Number(interval), Number(turns)],
        { account: address, chain: chains[chainId] }
      );

      const reciept = await publicClient?.waitForTransactionReceipt({ hash });

      if (!reciept)
        return {
          success: false,
          error: 'Missing reciept',
        };

      const { args } = decodeEventLog({
        abi: CreatGameEventAbi,
        data: reciept.logs[0].data,
        topics: reciept.logs[0].topics,
      });

      return {
        success: true,
        data: args as unknown as EventValues,
      };
    },
    [zKubeContract?.address, address, chains, chainId]
  );
}
