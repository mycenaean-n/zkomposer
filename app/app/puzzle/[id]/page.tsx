'use client';
import { LoginCTA } from '../../../src/components/wallet/LoginCTA';
import { usePrivyWalletAddress } from '../../../src/hooks/usePrivyWalletAddress';
import { useBlockNumber } from '../../../src/hooks/useBlockNumber';
import { usePuzzleData } from '../../../src/hooks/usePuzzleData';
import { PuzzleMemoized } from '../../../src/components/game/puzzle/Puzzle';

function LoadingState(text: string) {
  return (
    <div className="flex flex-grow justify-center items-center text-align-center w-screen h-full text-2xl">
      <h1>{text}</h1>
    </div>
  );
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const address = usePrivyWalletAddress();
  const { puzzle, loading } = usePuzzleData(id);

  if (loading) {
    return LoadingState('Loading puzzle...');
  }

  if (!puzzle && !loading) {
    return LoadingState('Puzzle not found');
  }

  if (!address && blockNumber) {
    return <LoginCTA />;
  }

  return (
    <>
      {puzzle && (
        <PuzzleMemoized initConfig={puzzle} id={id} gameMode="singleplayer" />
      )}
    </>
  );
}
