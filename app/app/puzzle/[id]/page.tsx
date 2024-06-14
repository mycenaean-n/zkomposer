'use client';
import { usePuzzleData } from '@hooks/fetching/usePuzzleData';
import { PuzzleMemoized } from '@components/game/puzzle/Puzzle';
import { LoadingState } from '@components/zk/LoadingState';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, loading } = usePuzzleData(id);

  if (loading) {
    return LoadingState({ textMain: 'Loading puzzle...' });
  }

  if (!data) {
    return LoadingState({ textMain: 'Puzzle not found' });
  }

  return <PuzzleMemoized initConfig={data} id={id} gameMode="singleplayer" />;
}
