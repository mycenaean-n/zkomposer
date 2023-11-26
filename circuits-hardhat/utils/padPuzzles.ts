import { writeFileSync } from "fs";
import path from "path";
const puzzles = require("../test/data/test-puzzles.json");

function padWithZerosToSizeEight(arr: number[][]): number[][] {
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

  return paddedArray;
}

function padPuzzles(obj: {
  [lvl: string]: {
    initial: number[][];
    target: number[][];
  };
}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key].initial = padWithZerosToSizeEight(obj[key].initial);
      obj[key].target = padWithZerosToSizeEight(obj[key].target);
    }
  }

  writeFileSync(
    path.join(__dirname, "../test/data/test-puzzles.json"),
    JSON.stringify(obj, null, 2)
  );
}

padPuzzles(puzzles);
