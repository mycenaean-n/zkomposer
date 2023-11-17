// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ZKubeHarness} from "./ZKube.harness.sol";
import {Game, Player, Proof} from "../../contracts/Types.sol";
import "../../contracts/Errors.sol";


contract ZKubeTest is Test {
    ZKubeHarness public zKube;
    address public zKubeVerifier;
    address public zKubePuzzleSet;

    address public deployer = vm.addr(1);
    address public player1 = vm.addr(2);
    address public player2 = vm.addr(3);

    function setUp() public {
        vm.deal(deployer, 100 ether);
        vm.deal(player1, 100 ether);
        vm.deal(player2, 100 ether);
        vm.startPrank(deployer);
        zKube = new ZKubeHarness(zKubeVerifier);
        vm.stopPrank();
    }

    function test_init() public {
        assertEq(zKube.verifier(), zKubeVerifier);
    }

    function testConcrete_createGame() public {
        uint8 interval = 10;
        uint16 numberOfTurns = 20;
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, interval, numberOfTurns, stake);

        (Player memory p1, Player memory p2, address puzzleSet, uint8 interval_, uint16 numberOfTurns_, uint72 startingBlock, uint256 stake_) = zKube.games(id);
        assertEq(p1.address_, player1);
        assertEq(p1.score, 0);
        assertEq(p2.address_, address(0));
        assertEq(p2.score, 0);
        assertEq(interval_, interval);
        assertEq(numberOfTurns_, numberOfTurns);
        assertEq(puzzleSet, zKubePuzzleSet);
        assertEq(startingBlock, 0);
        assertEq(stake_, stake);
    }

    function testConcrete_joinGame() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        uint88 currentBlock = uint88(block.number);
        vm.prank(player2);
        zKube.joinGame{value: stake}(id);


        (, Player memory p2,,,, uint72 startingBlock,) = zKube.games(id);
        assertEq(p2.address_, player2);
        assertEq(startingBlock, currentBlock + zKube.BLOCKS_UNTIL_START());
    }

    function testConcrete_joinGame_reverts_ifJoiningYourOwnGame() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player1);
        vm.expectRevert(JoiningYourOwnGame.selector);
        zKube.joinGame{value: stake}(id);
    }

    function testFuzz_joinGame_reverts_ifStakeNotMet(uint256 value) public {
        uint256 stake = 1 ether;
        vm.assume(value < stake);

        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player2);
        vm.expectRevert(StakeNotMet.selector);
        zKube.joinGame{value: value}(id);
    }

    function testConcrete_getBlock() public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfRounds = 20; 
        uint256 id = _createGame(player1, interval, numberOfRounds, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);
        vm.roll(block.number + 10);

        (,,,,, uint72 startingBlock,) = zKube.games(id);

        assertEq(zKube.exposed_getBlock(interval, startingBlock, numberOfRounds), 10);
    }

    function testFuzz_getBlock(uint256 jump) public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfTurns = 20;

        vm.assume(jump > 10 && jump < interval * numberOfTurns);
        uint256 id = _createGame(player1, interval, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);
        vm.roll(block.number + jump);

        (,,,,, uint72 startingBlock,) = zKube.games(id);
        uint256 expectedBlockNumber = block.number - block.number % interval;

        assertEq(zKube.exposed_getBlock(interval, startingBlock, numberOfTurns), expectedBlockNumber);
        assertTrue(zKube.exposed_getBlock(interval, startingBlock, numberOfTurns) % interval == 0);
    }

    function testFuzz_submitPuzzle_reverts_ifGameFinished(uint256 jump) public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfTurns = 20;

        
        uint256 id = _createGame(player1, interval, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);

        vm.assume(jump >= interval * numberOfTurns + 11 && jump < type(uint72).max);

        vm.roll(jump);

        (,,,,, uint72 startingBlock,) = zKube.games(id);
        vm.expectRevert(GameFinished.selector);
        zKube.exposed_getBlock(interval, startingBlock, numberOfTurns);
    }


    function testConcrete_submitPuzzle_reverts_ifInvalidProof() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);

        vm.roll(block.number + 10);

        Proof memory proof;
        uint256[3] memory publicSignals;

        vm.prank(player1);
        vm.expectRevert(InvalidProof.selector);
        zKube.submitPuzzle(id, publicSignals, proof);
    }

    function testConcrete_submitPuzzle() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);

        vm.roll(block.number + 10);

        Proof memory proof;
        uint256[3] memory publicSignals;

        vm.prank(player1);
        zKube.submitPuzzle(id, publicSignals, proof);

        (Player memory p1,, , , ,,) = zKube.games(id);

        assertEq(p1.score, 1);
        assertEq(p1.totalBlocks, 1);
    }

    function _createGame (address player, uint8 interval, uint16 numberOfTurns, uint256 stake) private returns (uint256 id) {
        vm.prank(player);
        id = zKube.createGame{value: stake}(zKubePuzzleSet, interval, numberOfTurns);
    }
}
