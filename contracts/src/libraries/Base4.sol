//SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

library Base4 {
    function hexToBase4(bytes16 input) internal pure returns (uint[] memory) {
        uint[] memory base4Array = new uint[](64); 
        uint index = 0;

        for (uint i = 0; i < 16; i++) {
            uint high = (uint8(input[i]) >> 4) & 0x0F;
            uint low = uint8(input[i]) & 0x0F;

            uint[] memory highBase4 = digitToBase4(high);
            uint[] memory lowBase4 = digitToBase4(low);

            for (uint j = 0; j < highBase4.length; j++) {
                base4Array[index++] = highBase4[j];
            }
            for (uint j = 0; j < lowBase4.length; j++) {
                base4Array[index++] = lowBase4[j];
            }
        }
       
        return base4Array;
    }

    function digitToBase4(uint digit) internal pure returns (uint256[] memory) {
        uint256[] memory results = new uint256[](2); 
        if (digit == 0) {
            results[0] = 0;
            results[1] = 0;
            return results;
        }
        uint temp = digit;
        uint count = 0;
        while (temp > 0) {
            results[count] = temp % 4;
            temp /= 4;
            count++;
        }
        return reverseArray(results);
    }

    function reverseArray(uint[] memory arr) internal pure returns (uint[] memory) {
        uint temp;
        uint len = arr.length;
        for (uint i = 0; i < len / 2; i++) {
            temp = arr[i];
            arr[i] = arr[len - 1 - i];
            arr[len - 1 - i] = temp;
        }
        return arr;
    }
}
