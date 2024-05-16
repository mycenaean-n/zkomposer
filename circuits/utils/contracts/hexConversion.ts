import { OnChainPuzzle } from 'app/src/types/Puzzle';

function base4ToHex(base4: string): string {
  const base4Array = Array.from(base4);
  const binaryString = base4Array
    .map((digit) => {
      // convert base4 digit to binary digit
      const binaryDigit = parseInt(digit, 4).toString(2);
      // pad with zeros
      return binaryDigit.padStart(2, '0');
    })
    .join('');

  let hexString = '';
  // Process the binary string in chunks of 4 bits
  for (let i = 0; i < binaryString.length; i += 4) {
    let chunk = binaryString.substring(i, i + 4).padStart(4, '0');
    let hexDigit = parseInt(chunk, 2).toString(16);
    hexString += hexDigit;
  }
  return hexString;
}

function hexToBase4(base16: string): string {
  const base16Array = Array.from(base16);
  const binaryString = base16Array
    .map((digit) => {
      // convert each hex digit to binary digit
      const binaryDigit = parseInt(digit, 16).toString(2);
      // pad to 4 digits
      return binaryDigit.padStart(4, '0');
    })
    .join('');

  // Process the binary string in chunks of 2 bits
  let base4String = '';
  for (let i = 0; i < binaryString.length; i += 2) {
    let chunk = binaryString.substring(i, i + 2).padStart(2, '0');
    let base4Digit = parseInt(chunk, 2).toString(4);
    base4String += base4Digit;
  }

  return base4String;
}

export function padPuzzle(puzzle: OnChainPuzzle): OnChainPuzzle {
  return {
    startingGrid: puzzle.startingGrid.padEnd(64, '0'),
    finalGrid: puzzle.finalGrid.padEnd(64, '0'),
    availableFunctions: puzzle.availableFunctions,
  };
}

function checkLength(puzzle: OnChainPuzzle, length: number) {
  if (puzzle.startingGrid.length != length || puzzle.finalGrid.length != length) {
    throw new Error(`String must be length ${length}`);
  }
}

export function convertPuzzleToHex(puzzle: OnChainPuzzle): OnChainPuzzle {
  const { startingGrid, finalGrid, availableFunctions } = puzzle;

  checkLength(puzzle, 64);

  return {
    startingGrid: `0x${base4ToHex(startingGrid)}`,
    finalGrid: `0x${base4ToHex(finalGrid)}`,
    availableFunctions,
  };
}

export function convertPuzzleToBase4FromHex(puzzle: OnChainPuzzle): OnChainPuzzle {
  const { startingGrid, finalGrid, availableFunctions } = puzzle;

  return {
    startingGrid: hexToBase4(startingGrid.slice(2)),
    finalGrid: hexToBase4(finalGrid.slice(2)),
    availableFunctions,
  };
}
