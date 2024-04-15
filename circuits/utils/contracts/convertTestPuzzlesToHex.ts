import fs from 'fs';
import { convertPuzzleToHex } from './hexConversion';
import { Puzzle } from '../../types/circuitFunctions.types';
import {getCircuitFunctionIndex} from '../circuitFunctionGetter'
import { OnChainPuzzle } from 'app/src/types/Puzzle';
import path from 'path';
const puzzles: Puzzle = require('../../test/data/puzzles.json');

function main() {
  const hexPuzzles: OnChainPuzzle[] = [];
  for (let key in puzzles) {
    const puzzleMapping: OnChainPuzzle = {} as OnChainPuzzle;
    const puzzle = puzzles[key as keyof Puzzle];
    puzzleMapping.availableFunctions = getCircuitFunctionIndex(puzzle.availableFunctions)
    puzzleMapping.startingGrid = puzzle.initial.flatMap(el => (el)).join('')
    puzzleMapping.finalGrid = puzzle.target.flatMap(el => (el)).join('')
    hexPuzzles.push(convertPuzzleToHex(puzzleMapping));
  }
  fs.writeFileSync(
    path.join(__dirname, '../../../contracts/script/data/puzzles.json'),
    JSON.stringify(hexPuzzles)
  );
}

main();
