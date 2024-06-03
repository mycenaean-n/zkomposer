'use client';
import { LoginCTA } from '../../../src/components/wallet/LoginCTA';
import { usePrivyWalletAddress } from '../../../src/hooks/usePrivyWalletAddress';
import { useBlockNumber } from '../../../src/hooks/useBlockNumber';
import { usePuzzleData } from '../../../src/hooks/fetching/usePuzzleData';
import { PuzzleMemoized } from '../../../src/components/game/puzzle/Puzzle';
import { LoadingState } from '../../../src/components/zk/LoadingState';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const { data, loading } = usePuzzleData(id);

  if (loading) {
    return LoadingState({ textMain: 'Loading puzzle...' });
  }

  if (!data) {
    return LoadingState({ textMain: 'Puzzle not found' });
  }

  if (!address && blockNumber) {
    return <LoginCTA />;
  }

  return <PuzzleMemoized initConfig={data} id={id} gameMode="singleplayer" />;
}
