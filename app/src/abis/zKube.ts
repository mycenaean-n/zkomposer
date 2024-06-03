export const abi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'verifier_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'BLOCKS_UNTIL_START',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createGame',
    inputs: [
      {
        name: 'puzzleSet',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'interval',
        type: 'uint16',
        internalType: 'uint16',
      },
      {
        name: 'numberOfTurns',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'gameId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'games',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'player1',
        type: 'tuple',
        internalType: 'struct Player',
        components: [
          {
            name: 'address_',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'score',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'totalBlocks',
            type: 'uint72',
            internalType: 'uint72',
          },
        ],
      },
      {
        name: 'player2',
        type: 'tuple',
        internalType: 'struct Player',
        components: [
          {
            name: 'address_',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'score',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'totalBlocks',
            type: 'uint72',
            internalType: 'uint72',
          },
        ],
      },
      {
        name: 'puzzleSet',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'interval',
        type: 'uint16',
        internalType: 'uint16',
      },
      {
        name: 'numberOfRounds',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'startingBlock',
        type: 'uint72',
        internalType: 'uint72',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'joinGame',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'parseInputSignals',
    inputs: [
      {
        name: 'puzzle',
        type: 'tuple',
        internalType: 'struct Puzzle',
        components: [
          {
            name: 'availableFunctions',
            type: 'uint8[]',
            internalType: 'uint8[]',
          },
          {
            name: 'finalGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
          {
            name: 'startingGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
        ],
      },
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'inputSignals',
        type: 'uint256[137]',
        internalType: 'uint256[137]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'resolveGame',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'roundSubmitted',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'selectPuzzle',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'roundBlockNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'game',
        type: 'tuple',
        internalType: 'struct Game',
        components: [
          {
            name: 'player1',
            type: 'tuple',
            internalType: 'struct Player',
            components: [
              {
                name: 'address_',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'score',
                type: 'uint16',
                internalType: 'uint16',
              },
              {
                name: 'totalBlocks',
                type: 'uint72',
                internalType: 'uint72',
              },
            ],
          },
          {
            name: 'player2',
            type: 'tuple',
            internalType: 'struct Player',
            components: [
              {
                name: 'address_',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'score',
                type: 'uint16',
                internalType: 'uint16',
              },
              {
                name: 'totalBlocks',
                type: 'uint72',
                internalType: 'uint72',
              },
            ],
          },
          {
            name: 'puzzleSet',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'interval',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'numberOfRounds',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'startingBlock',
            type: 'uint72',
            internalType: 'uint72',
          },
          {
            name: 'randomNumbers',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
        ],
      },
      {
        name: 'puzzle',
        type: 'tuple',
        internalType: 'struct Puzzle',
        components: [
          {
            name: 'availableFunctions',
            type: 'uint8[]',
            internalType: 'uint8[]',
          },
          {
            name: 'finalGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
          {
            name: 'startingGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'submitPuzzle',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'proof',
        type: 'tuple',
        internalType: 'struct Proof',
        components: [
          {
            name: 'a',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'b',
            type: 'uint256[2][2]',
            internalType: 'uint256[2][2]',
          },
          {
            name: 'c',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'input',
            type: 'uint256[137]',
            internalType: 'uint256[137]',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'verifier',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'verifyPuzzleSolution',
    inputs: [
      {
        name: 'puzzleSet',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'puzzleId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'proof',
        type: 'tuple',
        internalType: 'struct Proof',
        components: [
          {
            name: 'a',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'b',
            type: 'uint256[2][2]',
            internalType: 'uint256[2][2]',
          },
          {
            name: 'c',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'input',
            type: 'uint256[137]',
            internalType: 'uint256[137]',
          },
        ],
      },
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'verifySolution',
    inputs: [
      {
        name: 'puzzle',
        type: 'tuple',
        internalType: 'struct Puzzle',
        components: [
          {
            name: 'availableFunctions',
            type: 'uint8[]',
            internalType: 'uint8[]',
          },
          {
            name: 'finalGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
          {
            name: 'startingGrid',
            type: 'bytes16',
            internalType: 'bytes16',
          },
        ],
      },
      {
        name: 'proof',
        type: 'tuple',
        internalType: 'struct Proof',
        components: [
          {
            name: 'a',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'b',
            type: 'uint256[2][2]',
            internalType: 'uint256[2][2]',
          },
          {
            name: 'c',
            type: 'uint256[2]',
            internalType: 'uint256[2]',
          },
          {
            name: 'input',
            type: 'uint256[137]',
            internalType: 'uint256[137]',
          },
        ],
      },
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'GameCreated',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'puzzleSet',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'player1',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'interval',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'numberOfTurns',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameJoined',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'player1',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'player2',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'startingBlock',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameResolved',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'winner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PlayerSubmitted',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'player',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Player',
        components: [
          {
            name: 'address_',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'score',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'totalBlocks',
            type: 'uint72',
            internalType: 'uint72',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadySubmitted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'GameFinished',
    inputs: [],
  },
  {
    type: 'error',
    name: 'GameNotFinished',
    inputs: [],
  },
  {
    type: 'error',
    name: 'GameNotStarted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'GameStarted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidProof',
    inputs: [],
  },
  {
    type: 'error',
    name: 'JoiningYourOwnGame',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotValidPlayer',
    inputs: [],
  },
] as const;
