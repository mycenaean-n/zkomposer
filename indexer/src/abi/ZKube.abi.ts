export const ABI_JSON = [
  {
    type: 'constructor',
    inputs: [
      { name: 'verifier_', type: 'address', internalType: 'address' },
      { name: 'gridWidth_', type: 'uint256', internalType: 'uint256' },
      { name: 'gridHeight_', type: 'uint256', internalType: 'uint256' },
      {
        name: 'numberOfAvailableFunctions_',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'GRID_SIZE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'NUM_AVAILABLE_ARGS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'solvedPuzzles',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'submitSolution',
    inputs: [
      { name: 'puzzleSet', type: 'address', internalType: 'address' },
      { name: 'puzzleId', type: 'uint256', internalType: 'uint256' },
      {
        name: 'proof',
        type: 'tuple',
        internalType: 'struct Proof',
        components: [
          { name: 'a', type: 'uint256[2]', internalType: 'uint256[2]' },
          { name: 'b', type: 'uint256[2][2]', internalType: 'uint256[2][2]' },
          { name: 'c', type: 'uint256[2]', internalType: 'uint256[2]' },
          { name: 'input', type: 'uint256[201]', internalType: 'uint256[201]' },
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
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'SolutionSubmitted',
    inputs: [
      {
        name: 'puzzleSet',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'puzzleId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'player',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'block',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'AlreadySubmitted', inputs: [] },
  { type: 'error', name: 'InvalidProof', inputs: [] },
];
