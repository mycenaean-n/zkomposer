import { useChainId, useChains } from 'wagmi';
import { useZkubeContract } from '../useContract';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { useEffect, useMemo, useRef, useState } from 'react';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { StringNumberBI, OnChainPuzzle, Puzzle } from 'types/Puzzle';
import { mapGrid } from 'utils';
import { isNumberNumericStringBI } from '@utils/isNumericString';
import { Address, Hex } from 'viem';
import { OnChainGame } from 'types/Game';
import { useBlockNumber } from '../useBlockNumber';
import { ContractFetchReturnType } from 'types/Hooks';

type SelectPuzzleResponse = {
  roundBlock: BigInt;
  game: {
    player1: {
      address_: Address;
      score: number;
      totalBlocks: bigint;
    };
    player2: {
      address_: Address;
      score: number;
      totalBlocks: bigint;
    };
    puzzleSet: Address;
    interval: number;
    numberOfRounds: number;
    startingBlock: bigint;
    randomNumbers: readonly bigint[];
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
): ContractFetchReturnType<{
  initConfig?: Puzzle;
  onChainGame: OnChainGame;
}> {
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
        console.error(e.message);
        setLoading(false);
      });
  }, [gameId, address, chains, chainId, zKubeContract?.address, blockNumber]);

  return useMemo(() => {
    if (!data) {
      return {
        loading,
        success: false,
        error: 'No data found',
      };
    }

    const { roundBlock, game, hexPuzzle } = data;

    if (
      !hexPuzzle.availableFunctions.length ||
      !Number(hexPuzzle.startingGrid) ||
      !Number(hexPuzzle.finalGrid) ||
      !game.randomNumbers.length ||
      game.randomNumbers.every((el) => el === BigInt(0))
    ) {
      return {
        loading: false,
        success: true,
        data: { onChainGame: game },
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
      success: true,
    };
  }, [
    data?.hexPuzzle?.startingGrid,
    data?.hexPuzzle?.finalGrid,
    data?.hexPuzzle?.availableFunctions,
    data?.game?.startingBlock,
  ]);
}
