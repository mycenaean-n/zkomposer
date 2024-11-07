export const composePuzzleRoute = (puzzleSet: string, puzzleId: string) => {
  return `/puzzle?puzzleSet=${puzzleSet}&puzzleId=${puzzleId}`;
};
