import { Footer } from '@/src/components/game/Footer';
import { Game } from '../../../src/components/game/Game';

export default function Page({ params }: { params: { id: string } }) {
  return <Game id={params.id} />;
}
