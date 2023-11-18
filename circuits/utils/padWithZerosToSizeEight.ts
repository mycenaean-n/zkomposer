import { Colors } from "../types";

export function padWithZerosToSizeEight(arr: Colors[][]): Colors[][] {
  // Pad each nested array with zeros until its size is 8
  const paddedArray = arr.map((subArr) => {
    while (subArr.length < 8) {
      subArr.push(0);
    }
    return subArr;
  });

  if (paddedArray.length < 8) {
    for (let i = 0; i < 9 - paddedArray.length; i++) {
      paddedArray.push(Array(8).fill(0));
    }
  }
  console.log(paddedArray.length, paddedArray[0].length);
  return paddedArray;
}
