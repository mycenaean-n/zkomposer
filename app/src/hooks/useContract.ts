// @ts-ignore
'use client';
import {
  Address,
  EIP1193Provider,
  Hash,
  createWalletClient,
  custom,
  decodeEventLog,
  getContract,
  isAddress,
} from 'viem';
import { abi as zKubeAbi } from '../abis/zKube';
import { abi as zKubePuzzleSetAbi } from '../abis/zKubePuzzleSet';
import { usePublicClient, useReadContract } from 'wagmi';
import { ZKUBE_ADDRESS, ZKUBE_PUZZLESET_ADDRESS } from '../config';
import { waitForTransactionReceipt } from 'viem/actions';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { OnChainGame } from '../types/Game';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { mapGrid } from '../utils';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { ZKProof } from '../types/Proof';
import { useCallback, useState } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { usePrivyWalletAddress } from './usePrivyWalletAddress';

type WriteResult = {
  txHash: Hash;
  success: boolean;
};

type CreateGameEventValues = {
  gameId: bigint;
  puzzleSet: Address;
  player1: Address;
  interval: bigint;
  numberOfTurns: bigint;
};

type ZKubeContractActions = Partial<{
  createGame: (
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ) => Promise<WriteResult & { eventValues: CreateGameEventValues }>;
  joinGame: (gameId: bigint) => Promise<WriteResult>;
  getGame: (gameId: bigint) => Promise<OnChainGame>;
  selectPuzzle: (gameId: bigint) => Promise<{
    roundBlock: bigint;
    game: OnChainGame;
    puzzle: Puzzle;
  }>;
  submitPuzzle: (gameId: bigint, proof: ZKProof) => Promise<WriteResult>;
  verifyPuzzleSolution: (
    puzzleSet: Address,
    puzzleId: bigint,
    proof: ZKProof
  ) => Promise<boolean>;
}>;

type ZKubePuzzleSetContractActions = Partial<{
  getPuzzle: (puzzleId: bigint) => Promise<Puzzle>;
}>;

export function useClients() {
  const { wallets } = useWallets();

  const [provider, setProvider] = useState<EIP1193Provider | undefined>();

  if (wallets[0]) {
    wallets[0].getEthereumProvider().then((p) => {
      setProvider(p as EIP1193Provider);
    });
  }

  const publicClient = usePublicClient();
  if (!publicClient) {
    throw new Error('Public client not found');
  }

  const walletClient =
    provider &&
    createWalletClient({
      chain: publicClient?.chain,
      transport: custom(provider),
    });

  return { publicClient, walletClient };
}

export function useZkubeContract(): ZKubeContractActions {
  const { publicClient, walletClient } = useClients();

  const address = usePrivyWalletAddress();

  const zKube = getContract({
    abi: zKubeAbi,
    address: ZKUBE_ADDRESS,
    client: { public: publicClient, wallet: walletClient },
  });

  const createGame = useCallback(
    async (
      targetPuzzleSet: string,
      interval: number,
      numberOfTurns: number
    ): Promise<WriteResult & { eventValues: CreateGameEventValues }> => {
      if (isAddress(targetPuzzleSet)) {
        if (!walletClient) throw new Error('No address found');
        const txHash = await (zKube as any).write.createGame(
          [targetPuzzleSet, interval, numberOfTurns],
          { account: address, chain: walletClient?.chain }
        );

        const receipt = await waitForTransactionReceipt(publicClient!, {
          hash: txHash,
        });

        const eventAbi = [
          zKubeAbi.find((a) => a.type === 'event' && a.name === 'GameCreated'),
        ];

        const decodedEvent = decodeEventLog({
          abi: eventAbi,
          data: receipt.logs[0].data,
          topics: receipt.logs[0].topics,
        });

        return {
          txHash,
          success: receipt.status === 'success',
          // TODO: add types
          eventValues: decodedEvent?.args as unknown as CreateGameEventValues,
        };
      } else {
        alert('Invalid address');
        throw new Error('Invalid address');
      }
    },
    [walletClient, zKube]
  );

  const joinGame = useCallback(
    async (gameId: bigint): Promise<WriteResult> => {
      if (!address || !zKube || !walletClient) {
        throw new Error('No address found');
      }
      const txHash = await (zKube as any).write.joinGame([gameId], {
        account: address,
        chain: walletClient?.chain,
      });

      const receipt = await waitForTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash, success: receipt.status === 'success' };
    },
    [zKube, walletClient]
  );

  const getGame = useCallback(
    async (gameId: bigint): Promise<OnChainGame> => {
      if (!gameId || !publicClient) {
        throw new Error('No gameId or publicClient');
      }

      return await zKube.read.getGame([gameId]);
    },
    [publicClient]
  );

  const selectPuzzle = useCallback(
    async (
      gameId: bigint
    ): Promise<{ roundBlock: bigint; game: OnChainGame; puzzle: Puzzle }> => {
      const result = await publicClient?.readContract({
        abi: zKubeAbi,
        address: ZKUBE_ADDRESS,
        functionName: 'selectPuzzle',
        args: [gameId],
      });

      const [roundBlock, game, hexPuzzle] = result!;
      const base4Puzzle = convertPuzzleToBase4FromHex(
        hexPuzzle as OnChainPuzzle
      );
      const puzzle: Puzzle = {
        initialGrid: mapGrid(base4Puzzle.startingGrid),
        finalGrid: mapGrid(base4Puzzle.finalGrid),
        availableFunctions: base4Puzzle.availableFunctions.map(
          (functionId) => circuitFunctionsArray[functionId]
        ),
      };
      return { roundBlock, game, puzzle };
    },
    [publicClient]
  );

  const submitPuzzle = useCallback(
    async (gameId: bigint, proof: ZKProof): Promise<WriteResult> => {
      if (!address) {
        throw new Error('No address found');
      }
      const txHash = await (zKube as any).write.submitPuzzle([gameId, proof], {
        account: address,
        chain: walletClient?.chain,
      });

      const receipt = await waitForTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash: '0xdadada', success: true };
    },
    [zKube, address, walletClient]
  );

  const verifyPuzzleSolution = useCallback(
    async (
      puzzleSet: Address,
      puzzleId: bigint,
      proof: ZKProof
    ): Promise<boolean> => {
      if (!address) {
        throw new Error('No address found');
      }
      const result = await publicClient?.readContract({
        abi: zKubeAbi,
        address: ZKUBE_ADDRESS,
        functionName: 'verifyPuzzleSolution',
        args: [puzzleSet, puzzleId, proof, address],
      });

      return result as boolean;
    },
    [publicClient, address]
  );

  return {
    createGame,
    joinGame,
    selectPuzzle,
    submitPuzzle,
    verifyPuzzleSolution,
    getGame,
  };
}

export function usePuzzleSetContract(): ZKubePuzzleSetContractActions {
  if (typeof window == 'undefined') return {}; /// for SSR........... TODO: migrate to React.

  const { publicClient } = useClients();

  const getPuzzle = useCallback(
    async (puzzleId: bigint): Promise<Puzzle> => {
      const hexPuzzle = await publicClient.readContract({
        abi: zKubePuzzleSetAbi,
        address: ZKUBE_PUZZLESET_ADDRESS,
        functionName: 'getPuzzle',
        args: [puzzleId],
      });

      const base4Puzzle = convertPuzzleToBase4FromHex(
        hexPuzzle! as OnChainPuzzle
      );

      return {
        initialGrid: mapGrid(base4Puzzle.startingGrid),
        finalGrid: mapGrid(base4Puzzle.finalGrid),
        availableFunctions: base4Puzzle.availableFunctions.map(
          (functionId) => circuitFunctionsArray[functionId]
        ),
      };
    },
    [publicClient]
  );

  return { getPuzzle };
}
