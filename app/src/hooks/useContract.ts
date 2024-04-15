'use client';
import {
  Address,
  Hash,
  createWalletClient,
  custom,
  getContract,
  isAddress,
} from 'viem';
import { abi as zKubeAbi } from '../abis/zKube';
import { abi as zKubePuzzleSetAbi } from '../abis/zKubePuzzleSet';
import { useAccount, usePublicClient } from 'wagmi';
import { ZKUBE_ADDRESS, ZKUBE_PUZZLESET_ADDRESS } from '../config';
import { waitForTransactionReceipt } from 'viem/actions';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { OnChainGame } from '../types/Game';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { mapGrid } from '../utils';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { ZKProof } from '../types/Proof';
import { useCallback } from 'react';

type WriteResult = {
  txHash: Hash;
  success: boolean;
};

type ZKubeContractActions = Partial<{
  createGame: (
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ) => Promise<WriteResult>;
  joinGame: (gameId: bigint) => Promise<WriteResult>;
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
  if (!window.ethereum) {
    alert('please connect your wallet');
  }

  const publicClient = usePublicClient();
  if (!publicClient) {
    throw new Error('Public client not found');
  }

  const walletClient = createWalletClient({
    chain: publicClient?.chain,
    transport: custom(window.ethereum),
  });
  if (!walletClient) {
    throw new Error('Wallet client not found');
  }

  return { publicClient, walletClient };
}

export function useZkubeContract(): ZKubeContractActions {
  if (typeof window == 'undefined') return {} as ZKubeContractActions; /// for SSR........... TODO: migrate to React.

  const { publicClient, walletClient } = useClients();

  const { address } = useAccount();

  const zKube = getContract({
    abi: zKubeAbi,
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

      const receipt = await waitForTransactionReceipt(publicClient!, {
        hash: txHash,
      });
      return { txHash, success: receipt.status === 'success' };
    } else {
      alert('Invalid address');
      throw new Error('Invalid address');
    }
  }

  async function joinGame(gameId: bigint): Promise<WriteResult> {
    if (!address) {
      throw new Error('No address found');
    }
    const txHash = await zKube.write.joinGame([gameId], {
      account: address,
      chain: walletClient.chain,
    });

    const receipt = await waitForTransactionReceipt(publicClient!, {
      hash: txHash,
    });
    return { txHash, success: receipt.status === 'success' };
  }

  async function selectPuzzle(
    gameId: bigint
  ): Promise<{ roundBlock: bigint; game: OnChainGame; puzzle: Puzzle }> {
    const result = await publicClient?.readContract({
      abi: zKubeAbi,
      address: ZKUBE_ADDRESS,
      functionName: 'selectPuzzle',
      args: [gameId],
    });
    const [roundBlock, game, hexPuzzle] = result!;
    const base4Puzzle = convertPuzzleToBase4FromHex(hexPuzzle as OnChainPuzzle);
    const puzzle: Puzzle = {
      initialGrid: mapGrid(base4Puzzle.startingGrid),
      finalGrid: mapGrid(base4Puzzle.finalGrid),
      availableFunctions: base4Puzzle.availableFunctions.map(
        (functionId) => circuitFunctionsArray[functionId]
      ),
    };
    return { roundBlock, game, puzzle };
  }

  async function submitPuzzle(
    gameId: bigint,
    proof: ZKProof
  ): Promise<WriteResult> {
    if (!address) {
      throw new Error('No address found');
    }
    const txHash = await zKube.write.submitPuzzle([gameId, proof], {
      account: address,
      chain: walletClient.chain,
    });

    const receipt = await waitForTransactionReceipt(publicClient!, {
      hash: txHash,
    });
    return { txHash, success: receipt.status === 'success' };
  }

  async function verifyPuzzleSolution(
    puzzleSet: Address,
    puzzleId: bigint,
    proof: ZKProof
  ): Promise<boolean> {
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
  }

  return {
    createGame,
    joinGame,
    selectPuzzle,
    submitPuzzle,
    verifyPuzzleSolution,
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
