//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game, IZKubePuzzleSet, Player} from "./Types.sol";
import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import "forge-std/console.sol";

contract ZKubePuzzleSet is IZKubePuzzleSet, ERC721, Ownable {
    uint256 public numberOfPuzzles;

    mapping(uint256 => Puzzle) public puzzles;

    string public baseUri;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function addPuzzle(Puzzle calldata puzzle) external onlyOwner {
        uint256 puzzleId = numberOfPuzzles++;
        puzzles[puzzleId] = puzzle;
        _mint(msg.sender, puzzleId);
    }

    function getRandomPuzzle(uint256 randomNumber) external view returns (Puzzle memory puzzle) {
        puzzle = puzzles[randomNumber % numberOfPuzzles];
    }
    
    function getPuzzle(uint256 _id) public view returns (Puzzle memory) {
        return puzzles[_id];
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }
}
