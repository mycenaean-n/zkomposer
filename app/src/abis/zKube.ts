export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'verifier_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AlreadySubmitted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'GameFinished',
    type: 'error',
  },
  {
    inputs: [],
    name: 'GameNotFinished',
    type: 'error',
  },
  {
    inputs: [],
    name: 'GameNotStarted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'GameStarted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'IntervalTooBig',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidProof',
    type: 'error',
  },
  {
    inputs: [],
    name: 'JoiningYourOwnGame',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotValidPlayer',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'puzzleSet',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player1',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'interval',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numberOfTurns',
        type: 'uint256',
      },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player1',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player2',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startingBlock',
        type: 'uint256',
      },
    ],
    name: 'GameJoined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
    ],
    name: 'GameResolved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'address_',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'score',
            type: 'uint16',
          },
          {
            internalType: 'uint72',
            name: 'totalBlocks',
            type: 'uint72',
          },
        ],
        indexed: false,
        internalType: 'struct Player',
        name: 'player',
        type: 'tuple',
      },
    ],
    name: 'PlayerSubmitted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BLOCKS_UNTIL_START',
    outputs: [
      {
        internalType: 'uint72',
        name: '',
        type: 'uint72',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'puzzleSet',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'interval',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: 'numberOfTurns',
        type: 'uint16',
      },
    ],
    name: 'createGame',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gameId',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'games',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'address_',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'score',
            type: 'uint16',
          },
          {
            internalType: 'uint72',
            name: 'totalBlocks',
            type: 'uint72',
          },
        ],
        internalType: 'struct Player',
        name: 'player1',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'address_',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'score',
            type: 'uint16',
          },
          {
            internalType: 'uint72',
            name: 'totalBlocks',
            type: 'uint72',
          },
        ],
        internalType: 'struct Player',
        name: 'player2',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'puzzleSet',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'interval',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: 'numberOfRounds',
        type: 'uint16',
      },
      {
        internalType: 'uint72',
        name: 'startingBlock',
        type: 'uint72',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getGame',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'address_',
                type: 'address',
              },
              {
                internalType: 'uint16',
                name: 'score',
                type: 'uint16',
              },
              {
                internalType: 'uint72',
                name: 'totalBlocks',
                type: 'uint72',
              },
            ],
            internalType: 'struct Player',
            name: 'player1',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'address_',
                type: 'address',
              },
              {
                internalType: 'uint16',
                name: 'score',
                type: 'uint16',
              },
              {
                internalType: 'uint72',
                name: 'totalBlocks',
                type: 'uint72',
              },
            ],
            internalType: 'struct Player',
            name: 'player2',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'puzzleSet',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'interval',
            type: 'uint8',
          },
          {
            internalType: 'uint16',
            name: 'numberOfRounds',
            type: 'uint16',
          },
          {
            internalType: 'uint72',
            name: 'startingBlock',
            type: 'uint72',
          },
        ],
        internalType: 'struct Game',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8[]',
            name: 'availableFunctions',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes16',
            name: 'finalGrid',
            type: 'bytes16',
          },
          {
            internalType: 'bytes16',
            name: 'startingGrid',
            type: 'bytes16',
          },
        ],
        internalType: 'struct Puzzle',
        name: 'puzzle',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'parseInputSignals',
    outputs: [
      {
        internalType: 'uint256[137]',
        name: 'inputSignals',
        type: 'uint256[137]',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'resolveGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'roundSubmitted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'selectPuzzle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'roundBlockNumber',
        type: 'uint256',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'address_',
                type: 'address',
              },
              {
                internalType: 'uint16',
                name: 'score',
                type: 'uint16',
              },
              {
                internalType: 'uint72',
                name: 'totalBlocks',
                type: 'uint72',
              },
            ],
            internalType: 'struct Player',
            name: 'player1',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'address_',
                type: 'address',
              },
              {
                internalType: 'uint16',
                name: 'score',
                type: 'uint16',
              },
              {
                internalType: 'uint72',
                name: 'totalBlocks',
                type: 'uint72',
              },
            ],
            internalType: 'struct Player',
            name: 'player2',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'puzzleSet',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'interval',
            type: 'uint8',
          },
          {
            internalType: 'uint16',
            name: 'numberOfRounds',
            type: 'uint16',
          },
          {
            internalType: 'uint72',
            name: 'startingBlock',
            type: 'uint72',
          },
        ],
        internalType: 'struct Game',
        name: 'game',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8[]',
            name: 'availableFunctions',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes16',
            name: 'finalGrid',
            type: 'bytes16',
          },
          {
            internalType: 'bytes16',
            name: 'startingGrid',
            type: 'bytes16',
          },
        ],
        internalType: 'struct Puzzle',
        name: 'puzzle',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[2]',
            name: 'a',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[2][2]',
            name: 'b',
            type: 'uint256[2][2]',
          },
          {
            internalType: 'uint256[2]',
            name: 'c',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[137]',
            name: 'input',
            type: 'uint256[137]',
          },
        ],
        internalType: 'struct Proof',
        name: 'proof',
        type: 'tuple',
      },
    ],
    name: 'submitPuzzle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'puzzleSet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'puzzleId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[2]',
            name: 'a',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[2][2]',
            name: 'b',
            type: 'uint256[2][2]',
          },
          {
            internalType: 'uint256[2]',
            name: 'c',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[137]',
            name: 'input',
            type: 'uint256[137]',
          },
        ],
        internalType: 'struct Proof',
        name: 'proof',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'verifyPuzzleSolution',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8[]',
            name: 'availableFunctions',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes16',
            name: 'finalGrid',
            type: 'bytes16',
          },
          {
            internalType: 'bytes16',
            name: 'startingGrid',
            type: 'bytes16',
          },
        ],
        internalType: 'struct Puzzle',
        name: 'puzzle',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256[2]',
            name: 'a',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[2][2]',
            name: 'b',
            type: 'uint256[2][2]',
          },
          {
            internalType: 'uint256[2]',
            name: 'c',
            type: 'uint256[2]',
          },
          {
            internalType: 'uint256[137]',
            name: 'input',
            type: 'uint256[137]',
          },
        ],
        internalType: 'struct Proof',
        name: 'proof',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'verifySolution',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
