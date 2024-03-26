import { Footer } from '@/src/components/game/Footer';
import { Game } from '../../../src/components/game/Game';

export default function Page({ params }: { params: {id: string} }) {

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow h-96">
        <Game id={params.id} />
      </div>
      <Footer gameId={params.id}/>
    </div>
  );
}
