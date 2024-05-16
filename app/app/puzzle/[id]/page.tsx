'use client';
import { SinglePlayerGame } from '../../../src/components/game/SinglePlayerGame';

export default function Page({ params }: { params: { id: string } }) {
  return <SinglePlayerGame id={params.id} />;
}
