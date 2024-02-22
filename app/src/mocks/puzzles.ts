export type Puzzle = {
	startingGrid: string;
	finalGrid: string;
	availableFunctions: number[];
};

export const puzzleMapping: Record<number, Puzzle> = {
  0: {
    startingGrid:
      '1000000010000000100000001000000010000000100000001000000010000000',
    finalGrid:
      '2222000022220000222200002222000022220000222200002222000022220000',
    availableFunctions: [1, 7, 10],
  },
  1: {
    startingGrid: '3000000030000000300000003000000030000000',
    finalGrid: '1320000013200000132000001320000013200000',
    availableFunctions: [1, 5, 9, 15, 7],
  },
  2: {
    startingGrid: '3000000010000000120000001000000030000000',
    finalGrid: '3000000033000000332330003300000030000000',
    availableFunctions: [12, 15, 5, 7, 11, 2],
  },
  3: {
    startingGrid: '300000001200000030000000',
    finalGrid: '110000001211000011000000',
    availableFunctions: [3, 4, 7, 8, 12, 11, 9, 5],
  },
};
