// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ZKubeHarness} from "./ZKube.harness.sol";
import {Game} from "../../contracts/Types.sol";
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

        (address p1, address p2, address puzzleSet, uint8 interval_, uint16 numberOfTurns_, uint72 startingBlock, uint256 stake_) = zKube.games(id);
        assertEq(p1, player1);
        assertEq(p2, address(0));
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


        (, address p2,,,, uint72 startingBlock,) = zKube.games(id);
        assertEq(p2, player2);
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
        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);
        vm.roll(block.number + 10);

        assertEq(zKube.exposed_getBlock(id), 10);
    }

    function testFuzz_getBlock(uint256 jump) public {
        uint256 stake = 1 ether;
        uint256 interval = 10;
        uint256 numberOfTurns = 20;

        vm.assume(jump > 10 && jump < interval * numberOfTurns);
        uint256 id = _createGame(player1, 10, 20, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);
        vm.roll(block.number + jump);

        uint256 expectedBlockNumber = block.number - block.number % interval;

        assertEq(zKube.exposed_getBlock(id), expectedBlockNumber);
        assertTrue(zKube.exposed_getBlock(id) % interval == 0);
    }

    function _createGame (address player, uint8 interval, uint16 numberOfTurns, uint256 stake) private returns (uint256 id) {
        vm.prank(player);
        id = zKube.createGame{value: stake}(zKubePuzzleSet, interval, numberOfTurns);
    }
}
