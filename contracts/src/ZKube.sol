//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game, IZKubePuzzleSet, Player} from "./Types.sol";
import "./Errors.sol";
import {GameCreated, GameJoined, PlayerSubmitted, GameResolved} from "./Events.sol";

contract ZKube is IZKube {
    /// STATE ///
    address public immutable verifier;

    uint96 public gameId;

    uint72 public constant BLOCKS_UNTIL_START = 90; // approx 30 secs on arb-sepolia

    mapping(uint256 => Game) public games;

    // game Id => player => roundBlockNumber => hasSubmittedRound
    mapping(uint256 => mapping(address => mapping(uint256 => bool))) public roundSubmitted;

    /// MODIFIERS ///
    modifier ifGameNotStarted(uint256 id) {
        if (games[id].player2.address_ != address(0)) revert GameStarted();
        _;
    }

    modifier ifGameActive(uint256 id) {
        if (games[id].player2.address_ != address(0)) revert GameInactive();
        _;
    }

    function ifGameNotFinished(uint8 interval, uint72 startingBlock, uint16 numberOfRounds) private view {
        if (block.number >= startingBlock + interval * numberOfRounds) {
            revert GameFinished();
        }
    }

    function ifGameFinished(uint8 interval, uint72 startingBlock, uint16 numberOfRounds) private view {
        if (block.number < startingBlock + interval * numberOfRounds) {
            revert GameNotFinished();
        }
    }

    constructor(address verifier_) {
        verifier = verifier_;
    }

    // When a game is created, the blockstart is defined. Each turn must be made within a blockinterval no greater than 256 blocks.
    function createGame(address puzzleSet, uint8 interval, uint16 numberOfTurns) external returns (uint256 id) {
        if (interval > 256) revert IntervalTooBig();

        id = ++gameId;
        games[id] = Game(Player(msg.sender, 0, 0), Player(address(0), 0, 0), puzzleSet, interval, numberOfTurns, 0);
        emit GameCreated(id, puzzleSet, msg.sender, interval, numberOfTurns);
    }

    function joinGame(uint256 id) external ifGameNotStarted(id) {
        Game memory game = games[id];
        if (msg.sender == game.player1.address_) revert JoiningYourOwnGame();
        game.player2.address_ = msg.sender;
        game.startingBlock = uint72(block.number) + BLOCKS_UNTIL_START;
        games[id] = game;
        emit GameJoined(id, game.player1.address_, msg.sender, game.startingBlock);
    }

    // The selectPuzzle view function uses previous block.hash to select the same puzzle for both players deterministically
    function selectPuzzle(uint256 id)
        public
        view
        returns (uint256 roundBlockNumber, Game memory game, Puzzle memory puzzle)
    {
        game = games[id];
        roundBlockNumber = getBlock(game.interval, game.startingBlock, game.numberOfRounds);
        uint256 randomNumber = getRandomNumber(roundBlockNumber);
        puzzle = IZKubePuzzleSet(game.puzzleSet).getPuzzle(randomNumber);
    }

    // check is player and verify proof, revert if not valid proof.
    function submitPuzzle(uint256 id, Proof calldata proof) external {
        address sender = msg.sender;
        (uint256 roundBlockNumber, Game memory game,) = selectPuzzle(id);

        if (roundSubmitted[id][sender][roundBlockNumber]) revert AlreadySubmitted();
        roundSubmitted[id][sender][roundBlockNumber] = true;

        //TODO: add msg.sender and puzzle check in here, in verifier function?? Is it a publicSignal we hardcode as msg.sender? call selectPuzzle here to get publicSignals??
        if (!IZKubeVerifier(verifier).verifyProof(proof.a, proof.b, proof.c, proof.input)) revert InvalidProof();

        if (sender == game.player1.address_) {
            game.player1 = Player(
                game.player1.address_,
                game.player1.score + 1,
                game.player1.totalBlocks + uint72(block.number % game.interval)
            );
            emit PlayerSubmitted(id, game.player1);
        } else if (sender == game.player2.address_) {
            game.player2 = Player(
                game.player2.address_,
                game.player2.score + 1,
                game.player2.totalBlocks + uint72(block.number % game.interval)
            );
            emit PlayerSubmitted(id, game.player2);
        } else {
            revert NotValidPlayer();
        }
        games[id] = game;
    }

    function getRandomNumber(uint256 blockNumber) internal view returns (uint256 randomNumber) {
        // always get previous blockhash
        return uint256(blockhash(blockNumber - 1));
    }

    function resolveGame(uint256 id) external {
        Game memory game = games[id];

        ifGameFinished(game.interval, game.startingBlock, game.numberOfRounds);

        if (game.player1.score > game.player2.score) {
            emit GameResolved(id, game.player1.address_);
        } else if (game.player2.score > game.player1.score) {
            emit GameResolved(id, game.player2.address_);
        } else if (game.player1.score == game.player2.score) {
            if (game.player1.totalBlocks < game.player2.totalBlocks) {
                emit GameResolved(id, game.player1.address_);
            } else if (game.player2.totalBlocks < game.player1.totalBlocks) {
                emit GameResolved(id, game.player2.address_);
            } else {
                emit GameResolved(id, address(0));
            }
        }
    }

    function getBlock(uint8 interval, uint72 startingBlock, uint16 numberOfRounds)
        internal
        view
        returns (uint256 blockNumber)
    {
        ifGameNotFinished(interval, startingBlock, numberOfRounds);
        uint256 currentBlock = block.number;
        if (currentBlock < startingBlock) revert GameNotStarted();
        blockNumber = currentBlock - (currentBlock % interval);
    }
}
