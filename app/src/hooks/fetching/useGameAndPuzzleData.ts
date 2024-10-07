import { isNumberNumericStringBI } from '@utils/isNumericString';
import { circuitFunctionsArray } from 'circuits/types/circuitFunctions.types';
import { convertPuzzleToBase4FromHex } from 'circuits/utils/contracts/hexConversion';
import { useEffect, useMemo, useState } from 'react';
import { OnChainGame } from 'types/Game';
import { ContractFetchReturnType } from 'types/Hooks';
import { OnChainPuzzle, Puzzle, StringNumberBI } from 'types/Puzzle';
import { mapGrid } from 'utils';
import { Address, Hex } from 'viem';
import { useChainId } from 'wagmi';
import { useZkubeContract } from '../useContract';

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
  gameId: StringNumberBI
): ContractFetchReturnType<{
  initConfig?: Puzzle;
  onChainGame: OnChainGame;
}> {
  const zKubeContract = useZkubeContract(true);
  const chainId = useChainId();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SelectPuzzleResponse>();

  useEffect(() => {
    if (gameId == null || !isNumberNumericStringBI(gameId) || !zKubeContract) {
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
    // todo: add is new round dependacy-1q2
  }, [gameId, chainId, zKubeContract?.address]);

  return useMemo(() => {
    if (!data) {
      return {
        loading,
        success: false,
        error: 'No data found',
      };
    }

    const { game, hexPuzzle } = data;

    const isPuzzleInvalid =
      hexPuzzle.availableFunctions.length === 0 ||
      !Number(hexPuzzle.startingGrid) ||
      !Number(hexPuzzle.finalGrid);

    const areRandomNumbersInvalid =
      game.randomNumbers.length === 0 ||
      game.randomNumbers.every((el) => el === BigInt(0));

    if (isPuzzleInvalid || areRandomNumbersInvalid) {
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
