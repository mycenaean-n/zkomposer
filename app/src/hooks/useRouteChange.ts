'use client';
import { useSearchParams } from 'next/navigation';
import { Address } from 'viem';

export function useRouteParams() {
  const router = useSearchParams();

  return {
    puzzleSet: router.get('puzzleSet') as Address,
    id: router.get('puzzleId') as string,
  };
}
