import { padWithZerosToSizeEight } from "circuits/utils/padWithZerosToSizeEight";
import * as puzzles from "./puzzles.json";
import { writeFileSync, writeSync } from "fs";

function padNestedArrays() {
  for (const key in puzzles) {
    if (puzzles.hasOwnProperty(key) && key !== "default") {
      const puzzle = puzzles[key as keyof typeof puzzles] as any;
      puzzle.initial = padWithZerosToSizeEight(puzzle.initial);
      puzzle.target = padWithZerosToSizeEight(puzzle.target);
    }
  }

  writeFileSync("puzzles.json", JSON.stringify(puzzles, null, 2));
}

padNestedArrays();
