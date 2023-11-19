// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ZKubeHarness} from "./ZKube.harness.sol";
import {Game, Player, Proof, Puzzle} from "../src/Types.sol";
import {ZKubePuzzleSet} from "../src/ZKubePuzzleSet.sol";
import "../src/Errors.sol";
import {ZKubeVerifier} from "../src/verifier/ZKubeVerifier.sol";

contract ZKubeTest is Test {
    ZKubeHarness public zKube;
    address public zKubeVerifier;
    address public zKubePuzzleSet;

    address public deployer = vm.addr(1);
    address public player1 = vm.addr(2);
    address public player2 = vm.addr(3);

    Proof internal proof =
        Proof(
            [
                18571725501287604842373861050020753385154668807004023001833311469112161188525,
                9806433847119117937652617151143830746731056161344482204817407346732596298729
            ],
            [
                [
                    15665812755059307225967247091572921183592450565312623394351877440672093128987,
                    13897895712420266553781896967384468119378885106098605905646831956181420592979
                ],
                [
                    16894867376785696945261219758922387763318300181146478238250994679977894868522,
                    20418734889359356794091839695850527798462644396191381167516359089381497735524
                ]
            ],
            [
                20975922450350574414412882371847900178323079428878758464345929058848195185485,
                8688178612702952068801580526472433571359783721878079719477200214223366572085
            ],
            [
                uint256(1),
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                2,
                2,
                1,
                0,
                0,
                0,
                0,
                2,
                2,
                1,
                0,
                0,
                0,
                0,
                0,
                2,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                2,
                1,
                0,
                0,
                0,
                0,
                0,
                2,
                2,
                2,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0x11
            ]
        );

    function setUp() public {
        vm.deal(deployer, 100 ether);
        vm.deal(player1, 100 ether);
        vm.deal(player2, 100 ether);
        vm.startPrank(deployer);
        zKubeVerifier = address(new ZKubeVerifier());
        ZKubePuzzleSet puzzleSet = new ZKubePuzzleSet(
            "Demo puzzle set",
            "ZKPuzzle"
        );
        zKubePuzzleSet = address(puzzleSet);
        Puzzle memory puzzle;
        puzzleSet.addPuzzle(puzzle);
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

        (
            Player memory p1,
            Player memory p2,
            address puzzleSet,
            uint8 interval_,
            uint16 numberOfTurns_,
            uint72 startingBlock,
            uint256 stake_
        ) = zKube.games(id);
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
        uint256 startingBlock = _joinGame(player2, id, stake);

        (, Player memory p2, , , , , ) = zKube.games(id);
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

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock);
        assertEq(
            zKube.exposed_getBlock(
                interval,
                uint72(startingBlock),
                numberOfRounds
            ),
            10
        );
    }

    function testFuzz_getBlock(uint256 jump) public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfTurns = 20;

        vm.assume(jump < interval * numberOfTurns);
        uint256 id = _createGame(player1, interval, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock + jump);

        uint256 expectedBlockNumber = block.number - (block.number % interval);

        assertEq(
            zKube.exposed_getBlock(
                interval,
                uint72(startingBlock),
                numberOfTurns
            ),
            expectedBlockNumber
        );
        assertTrue(
            zKube.exposed_getBlock(
                interval,
                uint72(startingBlock),
                numberOfTurns
            ) %
                interval ==
                0
        );
    }

    function testFuzz_getBlock_reverts_ifGameFinished(uint256 jump) public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfTurns = 20;

        uint256 id = _createGame(player1, interval, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock);

        vm.assume(jump >= interval * numberOfTurns && jump < type(uint72).max);
        vm.roll(startingBlock + jump);

        vm.expectRevert(GameFinished.selector);
        zKube.exposed_getBlock(interval, uint72(startingBlock), numberOfTurns);
    }

    function testConcrete_submitPuzzle() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock);

        vm.prank(player1);
        zKube.submitPuzzle(id, proof);

        (Player memory p1, , , , , , ) = zKube.games(id);

        assertEq(p1.score, 1);
        assertEq(p1.totalBlocks, 1);
    }

    function testConcrete_submitPuzzle_reverts_ifInvalidProof() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock);

        Proof memory proof;
        uint256[3] memory publicSignals;

        vm.prank(player1);
        vm.expectRevert(InvalidProof.selector);
        zKube.submitPuzzle(id, proof);
    }

    function testConcrete_submitPuzzle_reverts_ifAlreadySubmitted() public {
        uint256 stake = 1 ether;
        uint256 id = _createGame(player1, 10, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);

        vm.roll(startingBlock);

        vm.startPrank(player1);
        zKube.submitPuzzle(id, proof);

        vm.expectRevert(AlreadySubmitted.selector);
        zKube.submitPuzzle(id, proof);
    }

    function testConcrete_submitPuzzle_reverts_ifGameFinished() public {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfTurns = 20;

        uint256 id = _createGame(player1, interval, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock + interval * numberOfTurns);

        Proof memory proof;
        uint256[3] memory publicSignals;

        vm.expectRevert(GameFinished.selector);
        vm.prank(player1);
        zKube.submitPuzzle(id, proof);
    }

    function testConcrete_resolveGame() external {
        uint256 stake = 1 ether;
        uint8 interval = 10;
        uint16 numberOfRounds = 20;
        uint256 id = _createGame(player1, 10, 20, stake);

        uint256 startingBlock = _joinGame(player2, id, stake);
        vm.roll(startingBlock);

        vm.startPrank(player1);
        zKube.submitPuzzle(id, proof);

        vm.roll(startingBlock + interval * numberOfRounds);

        uint256 balBefore = player1.balance;
        zKube.resolveGame(id);
        assertEq(player1.balance, balBefore + 2 * stake);
    }

    function _createGame(
        address player,
        uint8 interval,
        uint16 numberOfTurns,
        uint256 stake
    ) private returns (uint256 id) {
        vm.prank(player);
        id = zKube.createGame{value: stake}(
            zKubePuzzleSet,
            interval,
            numberOfTurns
        );
    }

    function _joinGame(
        address player,
        uint256 id,
        uint256 stake
    ) private returns (uint256 startingBlock) {
        vm.prank(player);
        zKube.joinGame{value: stake}(id);
        (, , , , , startingBlock, ) = zKube.games(id);
    }
}
