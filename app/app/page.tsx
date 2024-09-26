import Link from 'next/link';
import { CreateGame } from '../src/components/lobbies/CreateGame';
import { SelectModeButton } from '../src/components/lobbies/SelectModeButton';

export default async function Home() {
  return (
    <section className="flex flex-col">
      <h1 className="py-8 text-center text-4xl">Create Game</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/puzzle/0">
          <SelectModeButton mode="singleplayer" type="button" />
        </Link>
        <CreateGame />
      </div>
    </section>
  );
}
