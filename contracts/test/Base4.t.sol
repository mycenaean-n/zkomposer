// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {Base4} from "../src/libraries/Base4.sol";
import {Constants} from "./Constants.sol";
import {Test, console2} from "forge-std/Test.sol";
contract Base4Test is Test, Constants {
    using Base4 for bytes16;

    function test_hexToBase4_first() public pure {
        bytes16 input = 0x00000000000000000000000001AB2CD3;
        uint[] memory expected = new uint[](GRID_HEIGHT*GRID_WIDTH);
        expected[51] = 1;
        expected[52] = 2;
        expected[53] = 2;
        expected[54] = 2;
        expected[55] = 3;
        expected[56] = 0;
        expected[57] = 2;
        expected[58] = 3;
        expected[59] = 0;
        expected[60] = 3;
        expected[61] = 1;
        expected[62] = 0;
        expected[63] = 3;

        uint[] memory result = input.hexToBase4();

        assertEq(result.length, expected.length, "Length of base4 array should match");
        for (uint i = 0; i < result.length; i++) {
            assertEq(result[i], expected[i], "Base4 conversion should be correct");
        }
    }

    function test_hexToBase4_second() public pure {
        bytes16 input = 0x0000230032000ef00000000001AB2CD3;
        uint[] memory expected = new uint[](GRID_HEIGHT*GRID_WIDTH);
        expected[9] = 2;
        expected[11] = 3;
        expected[17] = 3;
        expected[19] = 2;
        expected[26] = 3;
        expected[27] = 2;
        expected[28] = 3;
        expected[29] = 3;
        expected[51] = 1;
        expected[52] = 2;
        expected[53] = 2;
        expected[54] = 2;
        expected[55] = 3;
        expected[56] = 0;
        expected[57] = 2;
        expected[58] = 3;
        expected[59] = 0;
        expected[60] = 3;
        expected[61] = 1;
        expected[62] = 0;
        expected[63] = 3;

        uint[] memory result = input.hexToBase4();

        assertEq(result.length, expected.length, "Length of base4 array should match");
        for (uint i = 0; i < result.length; i++) {
            assertEq(result[i], expected[i], "Base4 conversion should be correct");
        }
    }

    function test_hexToBase4_failsIfIncorrect() public pure {
        bytes16 input = 0x00000000000000000000000001AB2CD3;
        uint[] memory expected = new uint[](GRID_HEIGHT*GRID_WIDTH);
        expected[61] = 3;
        expected[62] = 3;
        expected[63] = 1;

        uint[] memory result = input.hexToBase4();

        for (uint i = 61; i < 64; i++) {
            assertNotEq(result[i], expected[i], "Base4 assertion should not equals");
        }
    }
}
