// SPDX-License-Identifier: MIT

pragma solidity 0.8.22;

import {Test, console} from "forge-std/Test.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import {Puzzle, PuzzleJson} from "../src/Types.sol";

contract ZKubePuzzleSetTest is Test {
    ZKubePuzzleSet public puzzleSet;
    Puzzle[] public puzzles;

    address public deployer = vm.addr(1);

    constructor() {
        vm.prank(deployer);
        puzzleSet = new ZKubePuzzleSet("Test puzzle set", "ZKPuzzle");
    }

    function test_init() public view {
        assertEq(puzzleSet.owner(), deployer, "Owner should be deployer");
        assertEq(puzzleSet.name(), "Test puzzle set", "Name incorrectly set");
        assertEq(puzzleSet.symbol(), "ZKPuzzle", "Symbol incorrectly set");
    }

    function test_addPuzzle() public {
        _addPuzzles();
        assertEq(puzzleSet.numberOfPuzzles(), puzzles.length, "Puzzles should be added");
        for (uint256 i; i < puzzles.length; i++) {
            (bytes32 finalGrid, bytes32 startingGrid) = puzzleSet.puzzles(i);
            assertEq(startingGrid, puzzles[i].startingGrid, "Starting grid should be the same");
            assertEq(finalGrid, puzzles[i].finalGrid, "Final grid should be the same");
        }
    }

    function test_fuzz_getRandomPuzzle(uint256 randomNumber) public {
        _addPuzzles();
        Puzzle memory puzzle = puzzleSet.getRandomPuzzle(randomNumber);
        assertNotEq(puzzle.availableFunctions.length, 0, "Puzzle should have functions");
        assertNotEq(puzzle.finalGrid, bytes16(0), "Puzzle should have final grid");
        assertNotEq(puzzle.startingGrid, bytes16(0), "Puzzle should have starting grid");
    }

    function _addPuzzles () private {
        string memory file = vm.readFile("./script/data/test.puzzles.json");
        bytes memory json = vm.parseJson(file);
        PuzzleJson[] memory _puzzles = abi.decode(json, (PuzzleJson[]));
        for (uint256 i; i < _puzzles.length; i++) {
            Puzzle memory puzzle = Puzzle({
                startingGrid: bytes32(_puzzles[i].startingGrid),
                finalGrid: bytes32(_puzzles[i].finalGrid),
                availableFunctions: _puzzles[i].availableFunctions
            });
            puzzles.push(puzzle);
        }
        for (uint256 i; i < puzzles.length; i++) {
            vm.prank(deployer);
            console.logBytes32(puzzles[i].startingGrid);
            console.logBytes32(puzzles[i].finalGrid);
            puzzleSet.addPuzzle(puzzles[i]);
        }
    }
}
