'use client';
import { Hash, createWalletClient, custom, getContract, isAddress } from 'viem';
import { abi } from '../abis/zKube';
import { useAccount, useClient, usePublicClient } from 'wagmi';
import { ZKUBE_ADDRESS } from '../config';
import { waitForTransactionReceipt } from 'viem/actions';
import { Proof } from '../types/Proof';
import { OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { Game } from '../types/Game';
import { convertPuzzleToBase4 } from 'circuits/utils/contracts/hexConversion';
import { stringToGrid } from '../utils/stringToGrid';

type WriteResult = {
  txHash: Hash;
  success: boolean;
};

type ContractActions = {
  createGame: (
    targetPuzzleSet: string,
    interval: number,
    numberOfTurns: number
  ) => Promise<WriteResult>;
  joinGame: (gameId: bigint) => Promise<WriteResult>;
  getPuzzle(gameId: bigint): Promise<{
    roundBlock: bigint;
    game: Partial<Game>;
    puzzle: Puzzle;
  }>;
};

export function useContract(): ContractActions {
  if (typeof window == 'undefined') return {} as ContractActions; /// for SSR........... TODO: migrate to React.
  if (!window.ethereum) {
    alert('please connect your wallet');
  }
  const publicClient = usePublicClient();
  const walletClient = createWalletClient({
    chain: publicClient?.chain,
    transport: custom(window.ethereum),
  });
  const { address } = useAccount();
  if (!walletClient) {
    throw new Error('Wallet client not found');
  }

  const zKube = getContract({
    abi,
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

  async function getPuzzle(
    gameId: bigint
  ): Promise<{ roundBlock: bigint; game: Partial<Game>; puzzle: Puzzle }> {
    const result = await publicClient?.readContract({
      abi,
      address: ZKUBE_ADDRESS,
      functionName: 'selectPuzzle',
      args: [gameId],
    });
    const [roundBlock, game, hexPuzzle] = result!;
    const base4Puzzle = convertPuzzleToBase4(hexPuzzle as OnChainPuzzle);
    const puzzle: Puzzle = {
      initialGrid: stringToGrid(base4Puzzle.startingGrid),
      finalGrid: stringToGrid(base4Puzzle.finalGrid),
      availableFunctions: base4Puzzle.availableFunctions as any,
    };
    return { roundBlock, game, puzzle };
  }

  return { createGame, joinGame, getPuzzle };
}
