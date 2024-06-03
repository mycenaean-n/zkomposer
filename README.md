# zKube

PvP puzzle game inspired by [Cube Composer](https://david-peter.de/cube-composer/) and verified using ZK proofs.

## Rules

Two players play against each other in a pvp style game.

A **game** consists of a set of puzzles which are solved by each player in sequence of rounds. Each puzzle for each round is randomly selected with a deterministic read-only function, this ensures each player always gets the same puzzle.

A **puzzle** consists of a starting grid, a final grid, and a set of available functions to use.

A **function** will transform the grid, and the puzzle is solved by achieving the final grid.

A zero-knowledge proof is generated for each round submission and sent to a smart contract, where it is validated and the number of blocks it took to solve the round is recorded. A correct submission results in an extra point, the player at the end of the game with the most points will be the winner. In the eventuality of a draw, the player who submitted in the smallest amount of blocks will be deemed the winner.

## Smart Contracts

```mermaid

---

title: Smart Contracts

---

classDiagram

class ZKube{

<<IZKube>>

+createGame(address puzzleSet, uint8 interval, uint16 numberOfTurns) (uint256 id)

+joinGame(uint256 id)

+selectPuzzle(uint256 id) (Puzzle puzzle)

+submitPuzzle(uint256 id, uint256[3] publicSignals, Proof proof)

+resolveGame(uint256 id)

}



class ZKubePuzzleSet {

<<IERC721>>

+owner address

+getPuzzle(uint256 randNum) : (Puzzle puzzle)

+addPuzzle(Puzzle puzzle)

}



ZKube --> ZKubePuzzleSet: getPuzzle



class ZKubeVerifier {

+validateProof (Proof proof) : bool

}



ZKube --> ZKubeVerifier: validateProof




```

### Addresses

The contracts are deployed to Arbitrum Sepolia at these addresses:

- `ZKube`: [0xd98f77077a776481557ff562d19799809a71e05f](https://sepolia.arbiscan.io/address/0xd98f77077a776481557ff562d19799809a71e05f)

- `ZKubePuzzleSet`: [0x13cd31c4c3345e712a6501a040e8278b15107b32](https://sepolia.arbiscan.io/address/0x13cd31c4c3345e712a6501a040e8278b15107b32)

- `ZKubeVerifier`: [0xdbeec58fdedf8dd1b397e43618817035474a6555](https://sepolia.scrollscan.com/address/0xdbeec58fdedf8dd1b397e43618817035474a6555)

The **ZKube** contract is the only contract players will interact with. The first player will create a game using `createGame` and the second player will join using `joinGame`, the game will start `n` blocks after this. The players will get the puzzle by calling `selectPuzzle` and they will submit the proof of their solution using `submitProof`. The game can be resolved when it is finished by calling `resolveGame`

The **ZKubePuzzleSet** ERC721 contract defines a set of possible puzzles in a game contract, this makes the game very composable as it allows the community to create different sets of puzzles by deploying different **ZKubePuzzleSet** contracts - we will create a small set of puzzles as a POC.

## Circuits

The ZKube circuit is the main circuit that integrates game logic, which is divided among five separate circuits. Each of these circuits performs a distinct manipulation on the grid:

- `Stack`: Stacks elements of value `color`, of type `0 | 1 | 2 | 3`, on top of the grid.

- `Transform`: Transforms elements in the grid from value `colorIn` to `colorOut`, both of which are of type `0 | 1 | 2 | 3`.

- `TransformTwo`: Stacks elements of value `colorOut`, of type `0 | 1 | 2 | 3`, on top of elements with value `colorIn`, of type `0 | 1 | 2 | 3`.

- `Filter`: Filters columns containing elements of value `color`, of type `0 | 1 | 2 | 3`.

- `Reject`: Removes elements of value `color`, of type `0 | 1 | 2 | 3` from a grid.

The design of the circuits facilitates easy updates. New circuits containing transformation logic can be seamlessly integrated into the `ZKube` circuit without the need for extensive rewrites of its logic.

## Application Architecture

The front-end is a NextJS app deployed to Vercel.

The interactions will happen directly from the browser to the network the game exists on. There is no need for a backend for this demo. It is possible that we might benefit from a backend in a future update, this is why we chose NextJS.

## Grid Layout

The grid is 8x8 and there are 4 possible colours.
Each column of 8 is appended sequentially in base4. We chose base4 to limit the permutations for demo purposes and to save storage space when encoding to hexadecimal bytes for the EVM. Here are the colour representations: \
&nbsp; 0 = no block / no colour. \
&nbsp; 1 = yellow \
&nbsp; 2 = red \
&nbsp; 3 = blue

The columns are appended from left to right and from the bottom up. For example, a column with 1 yellow square at the bottom would be represented by 10000000. We append each column and the result is a base4 number of 64 length.

We will encode this from base4 (saves storage space) to hexadecimal bytes16.

## Considerations

1. Bots.
2. Circuits are not audited and without the trusted set up.
3. The games are most fair when there are lots of puzzles as it makes it almost impossible to know the solution to a puzzle.
