//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game, IZKubePuzzleSet, Player} from "./Types.sol";
import "./Errors.sol";

contract ZKube is IZKube {

    /// STATE ///
    address public immutable verifier;

    uint96 public gameId; 

    uint72 public constant BLOCKS_UNTIL_START = 10;

    mapping (uint256 => Game) public games;

    /// MODIFIERS ///
    modifier ifGameNotStarted (uint256 id) {
        if (games[id].player2.address_ != address(0)) revert GameStarted();
        _;
    }

    modifier ifGameActive (uint256 id) {
        if (games[id].player2.address_ != address(0)) revert GameInactive();
        _;
    }

    function ifGameNotFinished (uint8 interval, uint72 startingBlock, uint16 numberOfRounds) private view {
        if (block.number > startingBlock + interval * numberOfRounds) revert GameFinished();
    }

    constructor(address verifier_) {
        verifier = verifier_;
    }

    
    // When a game is created, the blockstart is defined. Each turn must be made within a blockinterval no greater than 256 blocks. 
    function createGame (address puzzleSet, uint8 interval, uint16 numberOfTurns) external payable returns (uint256 id) {
        if (interval > 256) revert IntervalTooBig();

        id = ++gameId;
        games[id] = Game(Player(msg.sender, 0, 0), Player(address(0), 0, 0), puzzleSet, interval, numberOfTurns, 0, msg.value);
    }

    
    function joinGame (uint256 id) external payable ifGameNotStarted(id) {
        Game memory game = games[id];
        if (msg.sender == game.player1.address_) revert JoiningYourOwnGame();
        if (msg.value != game.stake) revert StakeNotMet();
        game.player2.address_ = msg.sender;
        game.startingBlock = uint72(block.number) + BLOCKS_UNTIL_START;
        games[id] = game;
    }

    // The selectPuzzle view function uses previous block.hash to select the same puzzle for both players deterministically
    function selectPuzzle (uint256 id) external view returns (Puzzle memory puzzle) {
        Game memory game = games[id];
        uint256 randomNumber = getRandomNumber(getBlock(game.interval, game.startingBlock, game.numberOfRounds));
        return IZKubePuzzleSet(game.puzzleSet).getPuzzle(randomNumber);
    }

    // check is player and verify proof, revert if not valid proof.
    function submitPuzzle (uint256 id, uint256[3] calldata publicSignals, Proof calldata proof) external {
        //TODO: add msg.sender check in here, in verifier function?? Is it a publicSignal we hardcode as msg.sender? call selectPuzzle here to get publicSignals??
        // if (!IZKubeVerifier(verifier).verifyProof(proof.a, proof.b, proof.c, publicSignals)) revert InvalidProof();
        Game memory game = games[id];
        ifGameNotFinished(game.interval, game.startingBlock, game.numberOfRounds);
        if (msg.sender == game.player1.address_) {
            game.player1 = Player(game.player1.address_, game.player1.score + 1, game.player1.totalBlocks + uint72(block.number % game.interval));
        }
        else if (msg.sender == game.player2.address_) {
            game.player2 = Player(game.player2.address_, game.player2.score + 1, game.player2.totalBlocks + uint72(block.number % game.interval));
        }
        else {
            revert NotValidPlayer();
        }
        games[id] = game;
    }

    function getRandomNumber (uint256 blockNumber) internal view returns (uint256 randomNumber) {
        // always get previous blockhash 
        return uint256(blockhash(blockNumber - 1));
    }

    function getBlock (uint8 interval, uint72 startingBlock, uint16 numberOfRounds) internal view returns (uint256 blockNumber) {
        uint256 currentBlock = block.number;
        if (currentBlock < startingBlock) revert GameNotStarted();
        blockNumber = block.number - block.number % interval;
        ifGameNotFinished(interval, startingBlock, numberOfRounds);
    }
}
