export const ABI_JSON = [
  {
    type: 'constructor',
    stateMutability: 'undefined',
    payable: false,
    inputs: [
      {
        type: 'address',
        name: 'verifier_',
      },
    ],
  },
  {
    type: 'function',
    name: 'BLOCKS_UNTIL_START',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [],
    outputs: [
      {
        type: 'uint72',
        name: '',
      },
    ],
  },
  {
    type: 'function',
    name: 'createGame',
    constant: false,
    payable: false,
    inputs: [
      {
        type: 'address',
        name: 'puzzleSet',
      },
      {
        type: 'uint8',
        name: 'interval',
      },
      {
        type: 'uint16',
        name: 'numberOfTurns',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'id',
      },
    ],
  },
  {
    type: 'function',
    name: 'gameId',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
      },
    ],
  },
  {
    type: 'function',
    name: 'games',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    outputs: [
      {
        type: 'tuple',
        name: 'player1',
        components: [
          {
            type: 'address',
            name: 'address_',
          },
          {
            type: 'uint16',
            name: 'score',
          },
          {
            type: 'uint72',
            name: 'totalBlocks',
          },
        ],
      },
      {
        type: 'tuple',
        name: 'player2',
        components: [
          {
            type: 'address',
            name: 'address_',
          },
          {
            type: 'uint16',
            name: 'score',
          },
          {
            type: 'uint72',
            name: 'totalBlocks',
          },
        ],
      },
      {
        type: 'address',
        name: 'puzzleSet',
      },
      {
        type: 'uint8',
        name: 'interval',
      },
      {
        type: 'uint16',
        name: 'numberOfRounds',
      },
      {
        type: 'uint72',
        name: 'startingBlock',
      },
    ],
  },
  {
    type: 'function',
    name: 'joinGame',
    constant: false,
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: 'id',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'resolveGame',
    constant: false,
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: 'id',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'roundSubmitted',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: '',
      },
      {
        type: 'address',
        name: '',
      },
      {
        type: 'uint256',
        name: '',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
      },
    ],
  },
  {
    type: 'function',
    name: 'selectPuzzle',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: 'id',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'roundBlockNumber',
      },
      {
        type: 'tuple',
        name: 'game',
        components: [
          {
            type: 'tuple',
            name: 'player1',
            components: [
              {
                type: 'address',
                name: 'address_',
              },
              {
                type: 'uint16',
                name: 'score',
              },
              {
                type: 'uint72',
                name: 'totalBlocks',
              },
            ],
          },
          {
            type: 'tuple',
            name: 'player2',
            components: [
              {
                type: 'address',
                name: 'address_',
              },
              {
                type: 'uint16',
                name: 'score',
              },
              {
                type: 'uint72',
                name: 'totalBlocks',
              },
            ],
          },
          {
            type: 'address',
            name: 'puzzleSet',
          },
          {
            type: 'uint8',
            name: 'interval',
          },
          {
            type: 'uint16',
            name: 'numberOfRounds',
          },
          {
            type: 'uint72',
            name: 'startingBlock',
          },
        ],
      },
      {
        type: 'tuple',
        name: 'puzzle',
        components: [
          {
            type: 'uint8[]',
            name: 'availableFunctions',
          },
          {
            type: 'bytes16',
            name: 'finalGrid',
          },
          {
            type: 'bytes16',
            name: 'startingGrid',
          },
        ],
      },
    ],
  },
  {
    type: 'function',
    name: 'submitPuzzle',
    constant: false,
    payable: false,
    inputs: [
      {
        type: 'uint256',
        name: 'id',
      },
      {
        type: 'tuple',
        name: 'proof',
        components: [
          {
            type: 'uint256[2]',
            name: 'a',
          },
          {
            type: 'uint256[2][2]',
            name: 'b',
          },
          {
            type: 'uint256[2]',
            name: 'c',
          },
          {
            type: 'uint256[129]',
            name: 'input',
          },
        ],
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'verifier',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    name: 'GameCreated',
    inputs: [
      {
        type: 'uint256',
        name: 'gameId',
        indexed: true,
      },
      {
        type: 'address',
        name: 'puzzleSet',
        indexed: true,
      },
      {
        type: 'address',
        name: 'player1',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'interval',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'numberOfTurns',
        indexed: false,
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    name: 'GameJoined',
    inputs: [
      {
        type: 'uint256',
        name: 'gameId',
        indexed: true,
      },
      {
        type: 'address',
        name: 'player1',
        indexed: true,
      },
      {
        type: 'address',
        name: 'player2',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'startingBlock',
        indexed: false,
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    name: 'GameResolved',
    inputs: [
      {
        type: 'uint256',
        name: 'gameId',
        indexed: true,
      },
      {
        type: 'address',
        name: 'winner',
        indexed: true,
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    name: 'PlayerSubmitted',
    inputs: [
      {
        type: 'uint256',
        name: 'gameId',
        indexed: true,
      },
      {
        type: 'tuple',
        name: 'player',
        indexed: false,
        components: [
          {
            type: 'address',
            name: 'address_',
          },
          {
            type: 'uint16',
            name: 'score',
          },
          {
            type: 'uint72',
            name: 'totalBlocks',
          },
        ],
      },
    ],
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
    name: 'IntervalTooBig',
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
];
