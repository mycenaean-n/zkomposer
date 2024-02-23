export const abi = [
  {
    "inputs": [
      { "internalType": "address", "name": "verifier_", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [], "name": "AlreadySubmitted", "type": "error" },
  { "inputs": [], "name": "GameFinished", "type": "error" },
  { "inputs": [], "name": "GameNotFinished", "type": "error" },
  { "inputs": [], "name": "GameNotStarted", "type": "error" },
  { "inputs": [], "name": "GameStarted", "type": "error" },
  { "inputs": [], "name": "IntervalTooBig", "type": "error" },
  { "inputs": [], "name": "InvalidProof", "type": "error" },
  { "inputs": [], "name": "JoiningYourOwnGame", "type": "error" },
  { "inputs": [], "name": "NotValidPlayer", "type": "error" },
  { "inputs": [], "name": "StakeNotMet", "type": "error" },
  {
    "inputs": [],
    "name": "BLOCKS_UNTIL_START",
    "outputs": [{ "internalType": "uint72", "name": "", "type": "uint72" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "puzzleSet", "type": "address" },
      { "internalType": "uint8", "name": "interval", "type": "uint8" },
      { "internalType": "uint16", "name": "numberOfTurns", "type": "uint16" }
    ],
    "name": "createGame",
    "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameId",
    "outputs": [{ "internalType": "uint96", "name": "", "type": "uint96" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "games",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "address_", "type": "address" },
          { "internalType": "uint16", "name": "score", "type": "uint16" },
          { "internalType": "uint72", "name": "totalBlocks", "type": "uint72" }
        ],
        "internalType": "struct Player",
        "name": "player1",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "address", "name": "address_", "type": "address" },
          { "internalType": "uint16", "name": "score", "type": "uint16" },
          { "internalType": "uint72", "name": "totalBlocks", "type": "uint72" }
        ],
        "internalType": "struct Player",
        "name": "player2",
        "type": "tuple"
      },
      { "internalType": "address", "name": "puzzleSet", "type": "address" },
      { "internalType": "uint8", "name": "interval", "type": "uint8" },
      { "internalType": "uint16", "name": "numberOfRounds", "type": "uint16" },
      { "internalType": "uint72", "name": "startingBlock", "type": "uint72" },
      { "internalType": "uint256", "name": "stake", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "resolveGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "roundSubmitted",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "selectPuzzle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "roundBlockNumber",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "address_",
                "type": "address"
              },
              { "internalType": "uint16", "name": "score", "type": "uint16" },
              {
                "internalType": "uint72",
                "name": "totalBlocks",
                "type": "uint72"
              }
            ],
            "internalType": "struct Player",
            "name": "player1",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "address_",
                "type": "address"
              },
              { "internalType": "uint16", "name": "score", "type": "uint16" },
              {
                "internalType": "uint72",
                "name": "totalBlocks",
                "type": "uint72"
              }
            ],
            "internalType": "struct Player",
            "name": "player2",
            "type": "tuple"
          },
          { "internalType": "address", "name": "puzzleSet", "type": "address" },
          { "internalType": "uint8", "name": "interval", "type": "uint8" },
          {
            "internalType": "uint16",
            "name": "numberOfRounds",
            "type": "uint16"
          },
          {
            "internalType": "uint72",
            "name": "startingBlock",
            "type": "uint72"
          },
          { "internalType": "uint256", "name": "stake", "type": "uint256" }
        ],
        "internalType": "struct Game",
        "name": "game",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint8[]",
            "name": "availableFunctions",
            "type": "uint8[]"
          },
          { "internalType": "bytes16", "name": "finalGrid", "type": "bytes16" },
          {
            "internalType": "bytes16",
            "name": "startingGrid",
            "type": "bytes16"
          }
        ],
        "internalType": "struct Puzzle",
        "name": "puzzle",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      {
        "components": [
          { "internalType": "uint256[2]", "name": "a", "type": "uint256[2]" },
          {
            "internalType": "uint256[2][2]",
            "name": "b",
            "type": "uint256[2][2]"
          },
          { "internalType": "uint256[2]", "name": "c", "type": "uint256[2]" },
          {
            "internalType": "uint256[129]",
            "name": "input",
            "type": "uint256[129]"
          }
        ],
        "internalType": "struct Proof",
        "name": "proof",
        "type": "tuple"
      }
    ],
    "name": "submitPuzzle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const
