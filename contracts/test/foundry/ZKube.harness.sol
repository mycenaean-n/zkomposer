//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ZKube} from "../../contracts/ZKube.sol";

contract ZKubeHarness is ZKube {
    constructor (address verifier) ZKube(verifier) {}

    function exposed_getBlock(uint256 id) public view returns (uint256 blockNumber) {
        return getBlock(id);
    }
}
