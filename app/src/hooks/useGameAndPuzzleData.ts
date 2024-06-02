import { useChainId, useChains } from 'wagmi';
import { useZkubeContract } from './useContract';
import { usePrivyWalletAddress } from './usePrivyWalletAddress';
import { useEffect, useMemo, useRef, useState } from 'react';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { StringNumberBI, OnChainPuzzle, Puzzle } from '../types/Puzzle';
import { mapGrid } from '../utils';
import { isNumberNumericStringBI } from '../utils/isNumericString';
import { Hex } from 'viem';
import { OnChainGame } from '../types/Game';
import { useBlockNumber } from './useBlockNumber';

type SelectPuzzleResponse = {
  roundBlock: BigInt;
  game: {
    player1: {
      address_: `0x${string}`;
      score: number;
      totalBlocks: bigint;
    };
    player2: {
      address_: `0x${string}`;
      score: number;
      totalBlocks: bigint;
    };
    puzzleSet: `0x${string}`;
    interval: number;
    numberOfRounds: number;
    startingBlock: bigint;
  };
  hexPuzzle: {
    availableFunctions: readonly number[];
    finalGrid: Hex;
    startingGrid: Hex;
  };
};

export function useGameAndPuzzleData(
  gameId: StringNumberBI,
  shouldPoll: boolean
): {
  data: { initConfig?: Puzzle; onChainGame?: OnChainGame };
  loading: boolean;
} {
  const zKubeContract = useZkubeContract(true);
  const address = usePrivyWalletAddress();
  const chains = useChains();
  const chainId = useChainId();
  const blockNumber = useBlockNumber();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SelectPuzzleResponse>();
  const pollingRef = useRef(shouldPoll);

  useEffect(() => {
    pollingRef.current = shouldPoll;
  }, [shouldPoll]);

  useEffect(() => {
    if (
      gameId == null ||
      !isNumberNumericStringBI(gameId) ||
      !address ||
      !zKubeContract ||
      !pollingRef.current
    ) {
      return;
    }

    zKubeContract.read
      .selectPuzzle([BigInt(gameId)])
      .then((result) => {
        const [roundBlock, game, hexPuzzle] = result;
        setData({
          roundBlock,
          game,
          hexPuzzle,
        });
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [gameId, address, chains, chainId, zKubeContract?.address, blockNumber]);

  return useMemo(() => {
    if (!data) {
      return {
        data: { roundBlock: undefined, game: undefined, puzzle: undefined },
        loading,
      };
    }

    const { roundBlock, game, hexPuzzle } = data;

    if (
      !hexPuzzle.availableFunctions.length ||
      !Number(hexPuzzle.startingGrid) ||
      !Number(hexPuzzle.finalGrid) ||
      !roundBlock
    ) {
      return {
        data: { roundBlock: undefined, onChainGame: game, puzzle: undefined },
        loading,
      };
    }

    const base4Puzzle = convertPuzzleToBase4FromHex(hexPuzzle as OnChainPuzzle);

    return {
      data: {
        initConfig: {
          initialGrid: mapGrid(base4Puzzle.startingGrid),
          finalGrid: mapGrid(base4Puzzle.finalGrid),
          availableFunctions: base4Puzzle.availableFunctions.map(
            (functionId) => circuitFunctionsArray[functionId]
          ),
        },
        onChainGame: game,
      },
      loading,
    };
  }, [
    data?.hexPuzzle?.startingGrid,
    data?.hexPuzzle?.finalGrid,
    data?.hexPuzzle?.availableFunctions,
    data?.game?.startingBlock,
  ]);
}
