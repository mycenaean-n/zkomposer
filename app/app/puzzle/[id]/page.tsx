'use client';
import { LoginCTA } from '@components/wallet/LoginCTA';
import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { useBlockNumber } from '@hooks/useBlockNumber';
import { usePuzzleData } from '@hooks/fetching/usePuzzleData';
import { PuzzleMemoized } from '@components/game/puzzle/Puzzle';
import { LoadingState } from '@components/zk/LoadingState';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const { data, loading } = usePuzzleData(id);

  if (loading) {
    return LoadingState({ textMain: 'Loading puzzle...' });
  }

  if (!address && blockNumber) {
    return <LoginCTA />;
  }

  if (!data) {
    return LoadingState({ textMain: 'Puzzle not found' });
  }

  return <PuzzleMemoized initConfig={data} id={id} gameMode="singleplayer" />;
}
