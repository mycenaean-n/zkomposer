// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

import {Script} from "forge-std/Script.sol";
import {ZKube} from "../src/ZKube.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
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
        availableFunctions1.push(7);
        availableFunctions1.push(8);
        availableFunctions1.push(9);

        availableFunctions2.push(8);
        availableFunctions2.push(9);
        availableFunctions2.push(3);
        availableFunctions2.push(6);

        availableFunctions3.push(7);
        availableFunctions3.push(8);
        availableFunctions3.push(9);
        availableFunctions3.push(3);
        availableFunctions3.push(6);

        availableFunctions4.push(7);
        availableFunctions4.push(8);
        availableFunctions4.push(9);
        availableFunctions4.push(3);

        puzzle1 = Puzzle({ startingGrid: 0x3078343030303430303034303030343030303030303030303030303030303030, finalGrid: 0x3078364430303644303036443030364330303030303030303030303030303030, availableFunctions: availableFunctions1 });
        puzzle2 = Puzzle({ startingGrid: 0x3078343030303430303034303030343030303030303030303030303030303030, finalGrid: 0x3078353430303534303035343030353430303030303030303030303030303030, availableFunctions: availableFunctions2 });
        puzzle3 = Puzzle({ startingGrid: 0x3078383030303830303038303030383030303030303030303030303030303030, finalGrid: 0x3078414130304141303041413030413830303030303030303030303030303030, availableFunctions: availableFunctions3 });
        puzzle4 = Puzzle({ startingGrid: 0x3078433030304330303043303030433030303030303030303030303030303030, finalGrid: 0x3078414530304145303041453030423030303030303030303030303030303030, availableFunctions: availableFunctions4 });
    }

    function run(address verifier) public {
        vm.startBroadcast();
        ZKube zKube = new ZKube(verifier);
        ZKubePuzzleSet puzzleSet = new ZKubePuzzleSet("Official ZKubePuzzleSet", "ZKPuzzle"); 
        puzzleSet.addPuzzle(puzzle1);
        puzzleSet.addPuzzle(puzzle2);
        puzzleSet.addPuzzle(puzzle3);
        puzzleSet.addPuzzle(puzzle4);
        vm.stopBroadcast();
    }
}
