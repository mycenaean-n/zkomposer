//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game, IZKubePuzzleSet, Player} from "./Types.sol";
import './ArbSys.sol';
import "./Errors.sol";
import "./libraries/Base4.sol";
import {GameCreated, GameJoined, PlayerSubmitted, GameResolved} from "./Events.sol";

contract ZKube is IZKube {
    using Base4 for bytes32;
    /// STATE ///
    address public immutable verifier;
    uint256 public immutable GRID_SIZE;
    uint256 public immutable NUM_AVAILABLE_ARGS;
    mapping(address => mapping(uint256 => mapping(address => uint))) public solvedPuzzles;
    
    constructor(address verifier_, uint256 gridWidth_, uint256 gridHeight_, uint256 numberOfAvailableFunctions_) {
        verifier = verifier_;
        GRID_SIZE = gridWidth_ * gridHeight_;
        NUM_AVAILABLE_ARGS = numberOfAvailableFunctions_;
    }

    function parseInputSignals(Puzzle memory puzzle, address sender) private view returns(uint256[201] memory inputSignals) {
        uint[] memory base4StartingGrid = puzzle.startingGrid.hexToBase4();
        uint[] memory base4FinalGrid = puzzle.finalGrid.hexToBase4();

        for (uint256 i = 0; i < GRID_SIZE; i++) {
            inputSignals[i] = base4StartingGrid[i];
            inputSignals[GRID_SIZE+i] = base4FinalGrid[i];
        }
        for (uint256 j = 0; j < NUM_AVAILABLE_ARGS; j++) {
            inputSignals[(2*GRID_SIZE)+j] = puzzle.availableFunctions[j];
        }
        inputSignals[2*GRID_SIZE+NUM_AVAILABLE_ARGS] = uint160(sender);
    }

    function verifySolution(Puzzle memory puzzle, Proof calldata proof, address sender) private view returns (bool) {
        uint256[201] memory inputSignals = parseInputSignals(puzzle, sender);
        return IZKubeVerifier(verifier).verifyProof(proof.a, proof.b, proof.c, inputSignals);
    }

    function submitSolution(address puzzleSet, uint256 puzzleId, Proof calldata proof) external {
        mapping(address => uint) storage userSolvedPuzzles = solvedPuzzles[puzzleSet][puzzleId];
        if (userSolvedPuzzles[msg.sender] != 0) revert AlreadySubmitted();

        Puzzle memory puzzle = IZKubePuzzleSet(puzzleSet).getPuzzle(puzzleId);
        if (!verifySolution(puzzle, proof, msg.sender)) revert InvalidProof();

        userSolvedPuzzles[msg.sender] = block.timestamp;
    }
}
