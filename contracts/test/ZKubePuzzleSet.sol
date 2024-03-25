// SPDX-License-Identifier: MIT

pragma solidity 0.8.22;

import {Test} from "forge-std/Test.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import {Puzzle, PuzzleJson} from "../src/Types.sol";

contract ZKubePuzzleSetTest is Test {
    ZKubePuzzleSet public puzzleSet;
    Puzzle[] public puzzles;

    address public deployer = vm.addr(1);

    constructor() {
        vm.startPrank(deployer);
        puzzleSet = new ZKubePuzzleSet("Test puzzle set", "ZKPuzzle");
        string memory file = vm.readFile("./script/data/puzzles.json");
        bytes memory json = vm.parseJson(file);
        PuzzleJson[] memory _puzzles = abi.decode(json, (PuzzleJson[]));
        for (uint256 i; i < _puzzles.length; i++) {
            Puzzle memory puzzle = Puzzle({
                startingGrid: bytes16(_puzzles[i].startingGrid),
                finalGrid: bytes16(_puzzles[i].finalGrid),
                availableFunctions: _puzzles[i].availableFunctions
            });
            puzzles.push(puzzle);
        }

        for (uint256 i; i < puzzles.length; i++) {
            puzzleSet.addPuzzle(puzzles[i]);
        }
        vm.stopPrank();
    }

    function test_init() public {
        assertEq(puzzleSet.owner(), deployer, "Owner should be deployer");
        assertEq(puzzleSet.name(), "Test puzzle set", "Name incorrectly set");
        assertEq(puzzleSet.symbol(), "ZKPuzzle", "Symbol incorrectly set");
    }

    function test_fuzz_getPuzzle(uint256 randomNumber) public {
        Puzzle memory puzzle = puzzleSet.getPuzzle(randomNumber);
        assertNotEq(puzzle.availableFunctions.length, 0, "Puzzle should have functions");
        assertNotEq(puzzle.finalGrid, bytes16(0), "Puzzle should have final grid");
        assertNotEq(puzzle.startingGrid, bytes16(0), "Puzzle should have starting grid");
    }
}