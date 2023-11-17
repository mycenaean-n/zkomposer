// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ZKube} from "../../contracts/ZKube.sol";
import {Game} from "../../contracts/Types.sol";
import "../../contracts/Errors.sol";


contract ZKubeTest is Test {
    ZKube public zKube;
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
        zKube = new ZKube(zKubeVerifier);
        vm.stopPrank();
    }

    function test_init() public {
        assertEq(zKube.verifier(), zKubeVerifier);
    }

    function test_createGame() public {
        uint96 interval = 10;
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, interval, stake);

        (address p1, address p2, address puzzleSet, uint96 interval_, uint256 stake_) = zKube.games(id);
        assertEq(p1, player1);
        assertEq(p2, address(0));
        assertEq(interval_, interval);
        assertEq(puzzleSet, zKubePuzzleSet);
        assertEq(stake_, stake);
    }

    function test_joinGame() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, stake);

        vm.prank(player2);
        zKube.joinGame{value: stake}(id);

        (, address p2,,,) = zKube.games(id);
        assertEq(p2, player2);
    }

    function test_joinGame_reverts_ifJoiningYourOwnGame() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, stake);

        vm.prank(player1);
        vm.expectRevert(JoiningYourOwnGame.selector);
        zKube.joinGame{value: stake}(id);
    }

    function testFuzz_joinGame_reverts_ifStakeNotMet(uint256 value) public {
        uint256 stake = 1 ether;
        vm.assume(value < stake);

        uint256 id = _createGame(player1, 10, stake);

        vm.prank(player2);
        vm.expectRevert(StakeNotMet.selector);
        zKube.joinGame{value: value}(id);
    }

    function _createGame (address player, uint96 interval, uint256 stake) private returns (uint256 id) {
        vm.prank(player);
        id = zKube.createGame{value: stake}(zKubePuzzleSet, interval);
    }
}
