// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ZKubeHarness} from "./ZKube.harness.sol";
import { Player, Proof, Puzzle, PuzzleJson} from "../src/Types.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import "../src/Errors.sol";
import {ZKubeVerifier} from "../src/ZKubeVerifier.sol";
import {stdJson} from "forge-std/StdJson.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import {GameCreated, GameJoined, PlayerSubmitted, GameResolved} from "../src/Events.sol";
import {Constants} from "./constants.sol";

contract ZKubeTest is Test, Constants {
    using stdJson for string;

    ZKubeHarness public zKube;
    address public zKubeVerifier;
    address public zKubePuzzleSet;

    address public deployer = vm.addr(1);
    address public player1 = vm.addr(2);
    address public player2 = vm.addr(3);

    Proof internal proofPlayerOne;
    Proof internal proofPlayerTwo;
    Puzzle[] public puzzles;

    constructor() {
        string memory root = vm.projectRoot();
        string memory proofPathPlayerOne = string.concat(root, "/test/zkube_proof_calldata_player_one.json");
        string memory proofPathPlayerTwo = string.concat(root, "/test/zkube_proof_calldata_player_two.json");
        string memory proofJsonPlayerOne = vm.readFile(proofPathPlayerOne);
        string memory proofJsonPlayerTwo = vm.readFile(proofPathPlayerTwo);
        proofPlayerOne = parseProof(proofJsonPlayerOne);
        proofPlayerTwo = parseProof(proofJsonPlayerTwo);

        string memory puzzleFile = vm.readFile("./script/data/test.puzzles.json");
        bytes memory puzzleJson = vm.parseJson(puzzleFile);
        PuzzleJson[] memory _puzzles = abi.decode(puzzleJson, (PuzzleJson[]));
        for (uint256 i; i < _puzzles.length; i++) {
            Puzzle memory puzzle = Puzzle({
                startingGrid: bytes16(_puzzles[i].startingGrid),
                finalGrid: bytes16(_puzzles[i].finalGrid),
                availableFunctions: _puzzles[i].availableFunctions
            });
            puzzles.push(puzzle);
        }
    }

    function parseProof (string memory proofJson) public pure returns(Proof memory) {
        uint256[2*GRID_WIDTH*GRID_HEIGHT+NUM_AVAILABLE_ARGS+1] memory input;
        for (uint256 i = 0; i < input.length; i++) {
            input[i] = proofJson.readUint(string.concat(string.concat(".[3].[", Strings.toString(i)), "]"));
        }

        return Proof(
            [proofJson.readUint(".[0].[0]"), proofJson.readUint(".[0].[1]")],
            [
                [proofJson.readUint(".[1].[0].[0]"), proofJson.readUint(".[1].[0].[1]")],
                [proofJson.readUint(".[1].[1].[0]"), proofJson.readUint(".[1].[1].[1]")]
            ],
            [proofJson.readUint(".[2].[0]"), proofJson.readUint(".[2].[1]")],
            input
        );
    }

    function setUp() public {
        vm.deal(deployer, 100 ether);
        vm.startPrank(deployer);
        zKubeVerifier = address(new ZKubeVerifier());
        ZKubePuzzleSet puzzleSet = new ZKubePuzzleSet("Demo puzzle set", "ZKPuzzle");
        zKubePuzzleSet = address(puzzleSet);

         for (uint256 i; i < puzzles.length; i++) {
            puzzleSet.addPuzzle(puzzles[i]);
        }
        zKube = new ZKubeHarness(zKubeVerifier, GRID_WIDTH, GRID_HEIGHT, NUM_AVAILABLE_ARGS);
        vm.stopPrank();
    }

    function test_init() public view {
        assertEq(zKube.verifier(), zKubeVerifier);
        assertEq(zKube.GRID_SIZE(), GRID_WIDTH * GRID_HEIGHT);
        assertEq(zKube.NUM_AVAILABLE_ARGS(), NUM_AVAILABLE_ARGS);
    }


    function testConcrete_submitPuzzle() public {
        vm.prank(player1);
        zKube.submitSolution(zKubePuzzleSet, 0, proofPlayerOne);
        assertEq(zKube.solvedPuzzles(zKubePuzzleSet, 0, player1), block.number);

        vm.prank(player2);
        zKube.submitSolution(zKubePuzzleSet, 0, proofPlayerTwo);
        assertEq(zKube.solvedPuzzles(zKubePuzzleSet, 0, player2), block.number);
    }

    function testConcrete_submitPuzzle_oneHour() public {
        vm.prank(player1);
        vm.warp(block.number + 10);
        zKube.submitSolution(zKubePuzzleSet, 0, proofPlayerOne);
        assertEq(zKube.solvedPuzzles(zKubePuzzleSet, 0, player1), block.number);
    }

    function testConcrete_submitPuzzle_wrongProof() public {
        vm.prank(player1);
        vm.expectRevert(InvalidProof.selector);
        zKube.submitSolution(zKubePuzzleSet, 0, proofPlayerTwo);
    }
}
