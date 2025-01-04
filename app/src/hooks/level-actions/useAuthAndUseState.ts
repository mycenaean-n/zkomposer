import { Address } from 'viem';
import { usePrivyWalletAddress } from '../privy/usePrivyWalletAddress';
import { useUserPuzzlesSolved } from '../useUserPuzzlesSolved';

export function useAuthAndUserState(puzzleSet: Address | null) {
  const { address } = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });

  return { address, user };
}
