// SPDX-License-Identifier: MIT

pragma solidity 0.8.22;

import {Player} from "./Types.sol";

event GameCreated(
    uint256 indexed gameId, address indexed puzzleSet, address indexed player1, uint256 interval, uint256 numberOfTurns
);

event GameJoined(uint256 indexed gameId, address indexed player1, address indexed player2, uint256 startingBlock);

event PlayerSubmitted(uint256 indexed gameId, Player player);

event GameResolved(uint256 indexed gameId, address indexed winner);

event SolutionSubmitted(address indexed puzzleSet, uint256 indexed puzzleId, address indexed player, uint256 blockNumber);
