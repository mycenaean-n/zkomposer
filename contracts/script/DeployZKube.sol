// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

import {Script} from "forge-std/Script.sol";
import {ZKube} from "../src/ZKube.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import {ZKubeVerifier} from "../src/ZKubeVerifier.sol";
import {Puzzle} from "../src/Types.sol";

contract DeployZKube is Script {
    
    uint8[] availableFunctions1;
    uint8[] availableFunctions2;
    uint8[] availableFunctions3;
    uint8[] availableFunctions4;

    Puzzle public puzzle1;
    Puzzle public puzzle2;
    Puzzle public puzzle3;
    Puzzle public puzzle4;

    function setUp () public {
        availableFunctions1.push(1);
        availableFunctions1.push(7);
        availableFunctions1.push(10);

        puzzle1 = Puzzle({ startingGrid: 0x40004000400040004000400040004000, finalGrid: 0xaa00aa00aa00aa00aa00aa00aa00aa00, availableFunctions: availableFunctions1 });
    }

    function run() public {
        vm.startBroadcast();
        ZKubeVerifier verifier = new ZKubeVerifier();
        new ZKube(address(verifier));
        ZKubePuzzleSet puzzleSet = new ZKubePuzzleSet("Official ZKubePuzzleSet", "ZKPuzzle"); 
        puzzleSet.addPuzzle(puzzle1);
        puzzleSet.addPuzzle(puzzle2);
        puzzleSet.addPuzzle(puzzle3);
        puzzleSet.addPuzzle(puzzle4);
        vm.stopBroadcast();
    }
}
