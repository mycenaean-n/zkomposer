//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

struct Proof {
    uint256[2] a;
    uint256[2][2] b;
    uint256[2] c;
    uint256[201] input;
}

struct Puzzle {
    uint8[] availableFunctions;
    bytes32 finalGrid;
    bytes32 startingGrid;
}

struct PuzzleJson {
    uint8[] availableFunctions;
    bytes finalGrid;
    bytes startingGrid;
}

struct Player {
    address address_;
    uint16 score;
    uint72 totalBlocks; // for tie breaks
}

interface IZKube {
    function submitSolution(address puzzleSet, uint256 puzzleId, Proof calldata proof) external;
}

// Please note that you should adjust the length of the inputs
interface IZKubeVerifier {
    function verifyProof(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[201] memory input)
        external
        view
        returns (bool r);
}

interface IZKubePuzzleSet {
    function getRandomPuzzle(uint256 randomNumber) external view returns (Puzzle memory puzzle);
    function getPuzzle(uint256 puzzleId) external view returns (Puzzle calldata puzzle);
}
