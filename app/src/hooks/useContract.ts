'use client';
import {
  Address,
  Client,
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
import { usePublicClient } from 'wagmi';
import { ZKUBE_ADDRESS, ZKUBE_PUZZLESET_ADDRESS } from '../config';
import { waitForTransactionReceipt } from 'viem/actions';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { OnChainGame } from '../types/Game';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { mapGrid } from '../utils';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { ZKProof } from '../types/Proof';
import { useCallback, useEffect, useState } from 'react';
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

interface ZKubeContractActions {
  createGame: (
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ) => Promise<WriteResult & { eventValues: CreateGameEventValues }>;
  joinGame: (gameId: bigint) => Promise<WriteResult>;
  selectPuzzle: (gameId: bigint) => Promise<{
    roundBlock?: bigint;
    game: OnChainGame;
    puzzle?: Puzzle;
  }>;
  submitPuzzle: (gameId: bigint, proof: ZKProof) => Promise<WriteResult>;
  verifyPuzzleSolution: (
    puzzleSet: Address,
    puzzleId: bigint,
    proof: ZKProof
  ) => Promise<boolean>;
}

interface ZKubePuzzleSetContractActions {
  getPuzzle: (puzzleId: bigint) => Promise<Puzzle>;
}

export function useClients() {
  const { wallets } = useWallets();

  const [provider, setProvider] = useState<EIP1193Provider | undefined>();

  useEffect(() => {
    if (wallets[0])
      wallets[0].getEthereumProvider().then((p) => {
        setProvider(p as EIP1193Provider);
      });
  }, [wallets[0]?.address]);

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

function getZkubeContract<T extends Client | undefined>({
  publicClient,
  walletClient,
}: {
  publicClient: Client;
  walletClient: T;
}) {
  return getContract({
    abi: zKubeAbi,
    address: ZKUBE_ADDRESS,
    client: { public: publicClient, wallet: walletClient },
  });
}

export function useZkube(): ZKubeContractActions {
  const { publicClient, walletClient } = useClients();

  const address = usePrivyWalletAddress();

  const createGame = useCallback(
    async (
      targetPuzzleSet: string,
      interval: number,
      numberOfTurns: number
    ): Promise<WriteResult & { eventValues: CreateGameEventValues }> => {
      if (!address || !walletClient)
        throw new Error('No address found or wallet');

      if (isAddress(targetPuzzleSet)) {
        const zKube = getZkubeContract({ publicClient, walletClient });
        const txHash = await zKube.write.createGame(
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
          eventValues: decodedEvent?.args as unknown as CreateGameEventValues,
        };
      } else {
        alert('Invalid address');
        throw new Error('Invalid address');
      }
    },
    [walletClient, publicClient, address]
  );

  const joinGame = useCallback(
    async (gameId: bigint): Promise<WriteResult> => {
      if (!address || !walletClient)
        throw new Error('No address found or wallet');

      const zKube = getZkubeContract({ publicClient, walletClient });
      const txHash = await zKube.write.joinGame([gameId], {
        account: address,
        chain: walletClient?.chain,
      });

      const receipt = await waitForTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash, success: receipt.status === 'success' };
    },
    [walletClient]
  );

  const selectPuzzle = useCallback(
    async (
      gameId: bigint
    ): Promise<{ roundBlock?: bigint; game: OnChainGame; puzzle?: Puzzle }> => {
      const result = await publicClient?.readContract({
        abi: zKubeAbi,
        address: ZKUBE_ADDRESS,
        functionName: 'selectPuzzle',
        args: [gameId],
      });

      const [roundBlock, game, hexPuzzle] = result!;

      if (
        !hexPuzzle.availableFunctions ||
        !hexPuzzle.startingGrid ||
        !hexPuzzle.finalGrid ||
        !roundBlock
      ) {
        return { roundBlock: undefined, game, puzzle: undefined };
      }

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
      if (!address || !walletClient)
        throw new Error('No address found or wallet');

      const zKube = getZkubeContract({ publicClient, walletClient });
      const txHash = await zKube.write.submitPuzzle([gameId, proof], {
        account: address,
        chain: walletClient?.chain,
      });

      const receipt = await waitForTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash: receipt.transactionHash, success: true };
    },
    [address, walletClient]
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
      const result = await publicClient.readContract({
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
  };
}

export function usePuzzleSetContract(): ZKubePuzzleSetContractActions {
  const { publicClient } = useClients();

  const getPuzzle = useCallback(
    async (puzzleId: bigint): Promise<Puzzle> => {
      const hexPuzzle = await publicClient.readContract({
        abi: zKubePuzzleSetAbi,
        address: ZKUBE_PUZZLESET_ADDRESS,
        functionName: 'getRandomPuzzle',
        args: [puzzleId],
      });

      const base4Puzzle = convertPuzzleToBase4FromHex(
        hexPuzzle as OnChainPuzzle
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
