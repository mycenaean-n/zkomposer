import { getCircuitFunctionName } from 'circuits';
import { mapGrid } from '../../utils';
import { puzzleMapping } from '../../mocks/puzzles';
import { Puzzle } from './Puzzle';

const mockPuzzle = puzzleMapping[0];

export function Game() {
  return (
    <Puzzle
      initialGrid={mapGrid(mockPuzzle.startingGrid)}
      finalGrid={mapGrid(mockPuzzle.finalGrid)}
      availableFunctions={mockPuzzle.availableFunctions.map((funcIndex) =>
        getCircuitFunctionName(funcIndex)
      )}
    />
  );
}
