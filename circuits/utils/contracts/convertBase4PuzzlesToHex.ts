import { OnChainPuzzle } from 'app/src/types/Puzzle';
import fs from 'fs';
import path from 'path';
import { Puzzle } from '../../types/circuitFunctions.types';
import { getCircuitFunctionIndex } from '../circuitFunctionGetter';
import { convertPuzzleToHex } from './hexConversion';
const puzzles: Puzzle = require('../../data/cube-composer.puzzles.json');

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
    path.join(__dirname, '../../../contracts/script/data/cube-composer.puzzles.json'),
    JSON.stringify(hexPuzzles)
  );
}

main();
