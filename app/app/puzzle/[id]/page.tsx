'use client';
import { LoginCTA } from '../../../src/components/wallet/LoginCTA';
import { usePrivyWalletAddress } from '../../../src/hooks/usePrivyWalletAddress';
import { useBlockNumber } from '../../../src/hooks/useBlockNumber';
import { usePuzzleData } from '../../../src/hooks/fetching/usePuzzleData';
import { PuzzleMemoized } from '../../../src/components/game/puzzle/Puzzle';

function LoadingState(text: string) {
  return (
    <div className="text-align-center flex h-full w-screen flex-grow items-center justify-center text-2xl">
      <h1>{text}</h1>
    </div>
  );
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const { data, loading } = usePuzzleData(id);

  if (loading) {
    return LoadingState('Loading puzzle...');
  }

  if (!data) {
    return LoadingState('Puzzle not found');
  }

  if (!address && blockNumber) {
    return <LoginCTA />;
  }

  return <PuzzleMemoized initConfig={data} id={id} gameMode="singleplayer" />;
}
