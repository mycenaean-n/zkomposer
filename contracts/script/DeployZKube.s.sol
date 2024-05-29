// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

import {Script, console} from "forge-std/Script.sol";
import {ZKube} from "../src/ZKube.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import {ZKubeVerifier} from "../src/ZKubeVerifier.sol";
import {Puzzle, PuzzleJson} from "../src/Types.sol";

contract DeployZKube is Script {
    Puzzle[] public puzzles;

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
        ZKubeVerifier verifier = new ZKubeVerifier();
        new ZKube(address(verifier));
        // ZKubePuzzleSet puzzleSet = new ZKubePuzzleSet("Official ZKubePuzzleSet", "ZKPuzzle");
        // for (uint256 i; i < puzzles.length; i++) {
        //     puzzleSet.addPuzzle(puzzles[i]);
        // }
        vm.stopBroadcast();
    }
}
