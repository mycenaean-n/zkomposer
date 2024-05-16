// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

import {Script, console} from "forge-std/Script.sol";
import {ZKube} from "../src/ZKube.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import {ZKubeVerifier} from "../src/ZKubeVerifier.sol";
import {Puzzle, PuzzleJson} from "../src/Types.sol";

contract AddPuzzles is Script {
    Puzzle[] public puzzles;
    address public constant PUZZLE_SET_CONTRACT_ADDRESS = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;

    function setUp() public {
        string memory file = vm.readFile("./script/data/cube-composer.puzzles.json");
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
    }

    function run() public {
        vm.startBroadcast();
        for (uint256 i; i < puzzles.length; i++) {
            ZKubePuzzleSet(PUZZLE_SET_CONTRACT_ADDRESS).addPuzzle(puzzles[i]);
        }
        vm.stopBroadcast();
    }
}
