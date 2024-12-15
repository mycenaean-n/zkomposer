import { useRouter } from 'next/navigation';
import { Address } from 'viem';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';
import { useUserPuzzlesSolved } from '../useUserPuzzlesSolved';

export function useAuthAndUserState(puzzleSet: Address | null) {
  const address = usePrivyWalletAddress();
  const { user } = useUserPuzzlesSolved({ address, puzzleSet });
  const router = useRouter();

  return { address, user, router };
}
