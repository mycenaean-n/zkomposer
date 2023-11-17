//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game} from "./Types.sol";
import "./Errors.sol";

contract ZKube is IZKube {

    /// STATE ///
    address public immutable verifier;

    uint96 public gameId; 

    uint72 public constant BLOCKS_UNTIL_START = 10;

    mapping (uint256 => Game) public games;

    /// MODIFIERS ///
    modifier ifGameNotStarted (uint256 id) {
        if (games[id].player2 != address(0)) revert GameStarted();
        _;
    }

    modifier ifGameActive (uint256 id) {
        if (games[id].player2 != address(0)) revert GameInactive();
        _;
    }

    constructor(address verifier_) {
        verifier = verifier_;
    }

    
    // When a game is created, the blockstart is defined. Each turn must be made within a blockinterval no greater than 256 blocks. 
    function createGame (address puzzleSet, uint8 interval, uint16 numberOfTurns) external payable returns (uint256 id) {
        if (interval > 256) revert IntervalTooBig();

        id = ++gameId;
        games[id] = Game(msg.sender, address(0), puzzleSet, interval, numberOfTurns, 0, msg.value);
    }

    
    function joinGame (uint256 id) external payable ifGameNotStarted(id) {
        Game memory game = games[id];
        if (msg.sender == game.player1) revert JoiningYourOwnGame();
        if (msg.value != game.stake) revert StakeNotMet();
        game.player2 = msg.sender;
        game.startingBlock = uint72(block.number) + BLOCKS_UNTIL_START;
        games[id] = game;
    }

    // The selectPuzzle view function uses previous block.hash to select the same puzzle for both players deterministically
    function selectPuzzle (uint256 id) external view returns (Puzzle memory puzzle) {
        uint256 randomNumber = getRandomNumber(getBlock(id));
    }

    // check is player and verify proof, revert if not valid proof.
    function submitPuzzle (uint256 id, Proof calldata proof) external {

    }

    function getRandomNumber (uint256 blockNumber) internal view returns (uint256 randomNumber) {
        return uint256(blockhash(blockNumber));
    }

    function getBlock (uint256 id) internal view returns (uint256 blockNumber) {
        Game memory game = games[id];
        uint256 currentBlock = block.number;
        if (currentBlock < game.startingBlock) revert GameNotStarted();
        blockNumber = block.number - block.number % game.interval;
    }
}
