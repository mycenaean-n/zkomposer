import { useUserPuzzlesSolved } from '../hooks/useUserPuzzlesSolved';

export function hasSubmittedPuzzle(
  user: ReturnType<typeof useUserPuzzlesSolved>['user'],
  puzzleId: string | number | null
) {
  return user?.solutions.some((s) => Number(s.puzzleId) === Number(puzzleId));
}
