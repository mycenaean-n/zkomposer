import { MultiplayerGame } from '../../../src/components/game/MultiplayerGame';

export default function Page({ params }: { params: { id: string } }) {
  return <MultiplayerGame id={params.id} />;
}
