//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import {Proof, IZKube, IZKubeVerifier, Puzzle, Game, IZKubePuzzleSet, Player} from "./Types.sol";
import './ArbSys.sol';
import "./Errors.sol";
import "./libraries/Base4.sol";
import {GameCreated, GameJoined, PlayerSubmitted, GameResolved} from "./Events.sol";

contract ZKube is IZKube {
    using Base4 for bytes16;
    /// STATE ///
    address public immutable verifier;
    uint32 public gameId;
    uint32 public constant BLOCKS_UNTIL_START = 120; // approx 30 seconds arbitrum
    uint16 public constant AVAILABLE_PAST_BLOCKS = 256;

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

    function ifGameNotFinished(uint16 interval, uint72 startingBlock, uint8 numberOfRounds) private view {
        if (uint72(arbiBlockNumber()) >= startingBlock + interval * numberOfRounds) {
            revert GameFinished();
        }
    }

    function ifGameFinished(uint16 interval, uint72 startingBlock, uint8 numberOfRounds) private view {
        if (uint72(arbiBlockNumber()) < startingBlock + interval * numberOfRounds) {
            revert GameNotFinished();
        }
    }

    constructor(address verifier_) {
        verifier = verifier_;
    }

    // When a game is created, the blockstart is defined. Each turn must be made within a blockinterval no greater than 256 blocks.
    function createGame(address puzzleSet, uint16 interval, uint8 numberOfTurns) external returns (uint256 id) {
        id = ++gameId;
        games[id] = Game(Player(msg.sender, 0, 0), Player(address(0), 0, 0), puzzleSet, interval, numberOfTurns, 0);
        emit GameCreated(id, puzzleSet, msg.sender, interval, numberOfTurns);
    }

    function joinGame(uint256 id) external ifGameNotStarted(id) {
        Game memory game = games[id];
        if (msg.sender == game.player1.address_) revert JoiningYourOwnGame();
        game.player2.address_ = msg.sender;
        game.startingBlock = uint72(arbiBlockNumber()) + BLOCKS_UNTIL_START;
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
        if (arbiBlockNumber() < game.startingBlock || game.startingBlock == 0) return (0, game, Puzzle(new uint8[](0), 0, 0));
        roundBlockNumber = getBlock(game.interval % AVAILABLE_PAST_BLOCKS, game.startingBlock, game.numberOfRounds);
        uint256 randomNumber = getRandomNumber(roundBlockNumber);
        puzzle = IZKubePuzzleSet(game.puzzleSet).getRandomPuzzle(randomNumber);
    }

    function parseInputSignals(Puzzle memory puzzle, address sender) public pure returns(uint256[137] memory inputSignals) {
        uint[] memory base4StartingGrid = puzzle.startingGrid.hexToBase4();
        uint[] memory base4FinalGrid = puzzle.finalGrid.hexToBase4();

        for (uint256 i = 0; i < 64; i++) {
            inputSignals[i] = uint8(base4StartingGrid[i]);
            inputSignals[i+64] = uint8(base4FinalGrid[i]);
        }
        for (uint256 j = 0; j < 8; j++) {
            inputSignals[j+128] = puzzle.availableFunctions[j];
        }
        inputSignals[136] = uint160(sender);
    }

    function verifySolution(Puzzle memory puzzle, Proof calldata proof, address sender) public view returns (bool) {
        return IZKubeVerifier(verifier).verifyProof(proof.a, proof.b, proof.c, parseInputSignals(puzzle, sender));
    }

    function verifyPuzzleSolution( address puzzleSet, uint256 puzzleId, Proof calldata proof, address sender) external view returns (bool) {
        Puzzle memory puzzle = IZKubePuzzleSet(puzzleSet).getPuzzle(puzzleId);
        if (!verifySolution(puzzle, proof, sender)) revert InvalidProof();
        return true;
    }

    // check is player and verify proof, revert if not valid proof.
    function submitPuzzle(uint256 id, Proof calldata proof) external {
        address sender = msg.sender;
        (uint256 roundBlockNumber, Game memory game, Puzzle memory puzzle) = selectPuzzle(id);

        if (roundSubmitted[id][sender][roundBlockNumber]) revert AlreadySubmitted();
        roundSubmitted[id][sender][roundBlockNumber] = true;

        //TODO: add msg.sender and puzzle check in here, in verifier function?? Is it a publicSignal we hardcode as msg.sender? call selectPuzzle here to get publicSignals??
        if (!verifySolution(puzzle, proof, msg.sender)) revert InvalidProof();

        uint72 blockNeededToSolvePuzzle = uint72(arbiBlockNumber()) % game.interval;
        if (sender == game.player1.address_) {
            game.player1 = Player(
                game.player1.address_,
                game.player1.score + 1,
                game.player1.totalBlocks + blockNeededToSolvePuzzle
            );
            emit PlayerSubmitted(id, game.player1);
        } else if (sender == game.player2.address_) {
            game.player2 = Player(
                game.player2.address_,
                game.player2.score + 1,
                game.player2.totalBlocks + blockNeededToSolvePuzzle
            );
            emit PlayerSubmitted(id, game.player2);
        } else {
            revert NotValidPlayer();
        }
        games[id] = game;
    }

    function getRandomNumber(uint256 blockNumber) internal view returns (uint256 randomNumber) {
        // always get previous blockhash
        return uint256(ArbSys(address(100)).arbBlockHash(blockNumber - 1));
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

    function getBlock(uint16 interval, uint72 startingBlock, uint8 numberOfRounds)
        internal
        view
        returns (uint256 blockNumber)
    {
        ifGameNotFinished(interval, startingBlock, numberOfRounds);
        uint256 currentBlock = arbiBlockNumber();
        if (currentBlock < startingBlock) revert GameNotStarted();
        blockNumber = currentBlock - ((currentBlock - startingBlock) % interval);
    }

    function arbiBlockNumber() private view returns (uint256) {
        return ArbSys(address(100)).arbBlockNumber();
    }
}
