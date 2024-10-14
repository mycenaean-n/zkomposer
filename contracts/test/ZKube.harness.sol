//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ZKube} from "../src/ZKube.sol";

contract ZKubeHarness is ZKube {
    constructor(address verifier_, uint256 gridWidth_, uint256 gridHeight_, uint256 numberOfAvailableFunctions_) ZKube(verifier_, gridWidth_, gridHeight_, numberOfAvailableFunctions_) {}
}
