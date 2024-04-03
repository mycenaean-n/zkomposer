import { puzzleMapping } from 'app/src/mocks/Puzzles';
import fs from 'fs';
import { convertPuzzleToHex, padPuzzle } from './hexConversion';

function main() {
  const base4Puzzles = Object.values(puzzleMapping);
  const hexPuzzles = base4Puzzles.map((puzzle) => {
    puzzle = padPuzzle(puzzle);
    return convertPuzzleToHex(puzzle);
  });

  fs.writeFileSync(
    '../../../contracts/script/data/puzzles.json',
    JSON.stringify(hexPuzzles)
  );
}

main();
