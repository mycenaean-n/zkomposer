import * as ethers from 'ethers';
import { LogEvent, Func, ContractBase } from './abi.support';
import { ABI_JSON } from './ZKube.abi';

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
  GameCreated: new LogEvent<
    [
      gameId: bigint,
      puzzleSet: string,
      player1: string,
      interval: bigint,
      numberOfTurns: bigint,
    ] & {
      gameId: bigint;
      puzzleSet: string;
      player1: string;
      interval: bigint;
      numberOfTurns: bigint;
    }
  >(abi, '0x87eba3a7460154c2af109dd99d6e57241a454feab681feb7ad514ea5c7f3e112'),
  GameJoined: new LogEvent<
    [
      gameId: bigint,
      player1: string,
      player2: string,
      startingBlock: bigint,
    ] & {
      gameId: bigint;
      player1: string;
      player2: string;
      startingBlock: bigint;
    }
  >(abi, '0xb1ac9c5d841dda39836a3b9dc15b1f0081b3dbbd0eeebca5667f8efe05af38da'),
  GameResolved: new LogEvent<
    [gameId: bigint, winner: string] & { gameId: bigint; winner: string }
  >(abi, '0xe1bef002fde33ebfa1c25a643ad667aa6dc80f7c8efb4b4161991251f8b4563a'),
  PlayerSubmitted: new LogEvent<
    [
      gameId: bigint,
      player: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      },
    ] & {
      gameId: bigint;
      player: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      };
    }
  >(abi, '0xfb455845340ebb34a50c4d3f32639edf98023ad22531b36109610265a8d6f996'),
};

export const functions = {
  BLOCKS_UNTIL_START: new Func<[], {}, bigint>(abi, '0x9ca99bb8'),
  createGame: new Func<
    [puzzleSet: string, interval: number, numberOfTurns: number],
    { puzzleSet: string; interval: number; numberOfTurns: number },
    bigint
  >(abi, '0x2efdae7b'),
  gameId: new Func<[], {}, bigint>(abi, '0xd7c81b55'),
  games: new Func<
    [_: bigint],
    {},
    [
      player1: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      },
      player2: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      },
      puzzleSet: string,
      interval: number,
      numberOfRounds: number,
      startingBlock: bigint,
    ] & {
      player1: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      };
      player2: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      };
      puzzleSet: string;
      interval: number;
      numberOfRounds: number;
      startingBlock: bigint;
    }
  >(abi, '0x117a5b90'),
  joinGame: new Func<[id: bigint], { id: bigint }, []>(abi, '0xefaa55a0'),
  resolveGame: new Func<[id: bigint], { id: bigint }, []>(abi, '0xb7a5a5b6'),
  roundSubmitted: new Func<[_: bigint, _: string, _: bigint], {}, boolean>(
    abi,
    '0x6468a924'
  ),
  selectPuzzle: new Func<
    [id: bigint],
    { id: bigint },
    [
      roundBlockNumber: bigint,
      game: [
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        puzzleSet: string,
        interval: number,
        numberOfRounds: number,
        startingBlock: bigint,
      ] & {
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        puzzleSet: string;
        interval: number;
        numberOfRounds: number;
        startingBlock: bigint;
      },
      puzzle: [
        availableFunctions: Array<number>,
        finalGrid: string,
        startingGrid: string,
      ] & {
        availableFunctions: Array<number>;
        finalGrid: string;
        startingGrid: string;
      },
    ] & {
      roundBlockNumber: bigint;
      game: [
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        puzzleSet: string,
        interval: number,
        numberOfRounds: number,
        startingBlock: bigint,
      ] & {
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        puzzleSet: string;
        interval: number;
        numberOfRounds: number;
        startingBlock: bigint;
      };
      puzzle: [
        availableFunctions: Array<number>,
        finalGrid: string,
        startingGrid: string,
      ] & {
        availableFunctions: Array<number>;
        finalGrid: string;
        startingGrid: string;
      };
    }
  >(abi, '0x516dcdd9'),
  submitPuzzle: new Func<
    [
      id: bigint,
      proof: [
        a: Array<bigint>,
        b: Array<Array<bigint>>,
        c: Array<bigint>,
        input: Array<bigint>,
      ] & {
        a: Array<bigint>;
        b: Array<Array<bigint>>;
        c: Array<bigint>;
        input: Array<bigint>;
      },
    ],
    {
      id: bigint;
      proof: [
        a: Array<bigint>,
        b: Array<Array<bigint>>,
        c: Array<bigint>,
        input: Array<bigint>,
      ] & {
        a: Array<bigint>;
        b: Array<Array<bigint>>;
        c: Array<bigint>;
        input: Array<bigint>;
      };
    },
    []
  >(abi, '0x230ecf3f'),
  verifier: new Func<[], {}, string>(abi, '0x2b7ac3f3'),
};

export class Contract extends ContractBase {
  BLOCKS_UNTIL_START(): Promise<bigint> {
    return this.eth_call(functions.BLOCKS_UNTIL_START, []);
  }

  gameId(): Promise<bigint> {
    return this.eth_call(functions.gameId, []);
  }

  games(arg0: bigint): Promise<
    [
      player1: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      },
      player2: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      },
      puzzleSet: string,
      interval: number,
      numberOfRounds: number,
      startingBlock: bigint,
    ] & {
      player1: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      };
      player2: [address_: string, score: number, totalBlocks: bigint] & {
        address_: string;
        score: number;
        totalBlocks: bigint;
      };
      puzzleSet: string;
      interval: number;
      numberOfRounds: number;
      startingBlock: bigint;
    }
  > {
    return this.eth_call(functions.games, [arg0]);
  }

  roundSubmitted(arg0: bigint, arg1: string, arg2: bigint): Promise<boolean> {
    return this.eth_call(functions.roundSubmitted, [arg0, arg1, arg2]);
  }

  selectPuzzle(id: bigint): Promise<
    [
      roundBlockNumber: bigint,
      game: [
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        puzzleSet: string,
        interval: number,
        numberOfRounds: number,
        startingBlock: bigint,
      ] & {
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        puzzleSet: string;
        interval: number;
        numberOfRounds: number;
        startingBlock: bigint;
      },
      puzzle: [
        availableFunctions: Array<number>,
        finalGrid: string,
        startingGrid: string,
      ] & {
        availableFunctions: Array<number>;
        finalGrid: string;
        startingGrid: string;
      },
    ] & {
      roundBlockNumber: bigint;
      game: [
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        },
        puzzleSet: string,
        interval: number,
        numberOfRounds: number,
        startingBlock: bigint,
      ] & {
        player1: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        player2: [address_: string, score: number, totalBlocks: bigint] & {
          address_: string;
          score: number;
          totalBlocks: bigint;
        };
        puzzleSet: string;
        interval: number;
        numberOfRounds: number;
        startingBlock: bigint;
      };
      puzzle: [
        availableFunctions: Array<number>,
        finalGrid: string,
        startingGrid: string,
      ] & {
        availableFunctions: Array<number>;
        finalGrid: string;
        startingGrid: string;
      };
    }
  > {
    return this.eth_call(functions.selectPuzzle, [id]);
  }

  verifier(): Promise<string> {
    return this.eth_call(functions.verifier, []);
  }
}
