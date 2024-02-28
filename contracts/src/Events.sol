// SPDX-License-Identifier: MIT

pragma solidity 0.8.22;

import {Player} from "./Types.sol";

event GameCreated(uint256 indexed gameId, address indexed player1, uint256 stake);

event GameJoined(uint256 indexed gameId, address indexed player2, uint256 startingBlock);

event PlayerSubmitted(uint256 indexed gameId, Player player);

event GameResolved(uint256 indexed gameId, address indexed winner, uint256 prize);
