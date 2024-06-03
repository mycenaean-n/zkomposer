'use client';
import SinglePlayer from '@components/lobbies/SinglePlayer';
import { CreateGame } from '@components/lobbies/CreateGame';

export default function Home() {
  return (
    <section className="mt-8 flex flex-col">
      <div className="m-auto mb-2">
        <h1 className="text-4xl">Create Game</h1>
      </div>
      <div id="games" className="mt-16 flex justify-center gap-10">
        <SinglePlayer />
        <CreateGame />
      </div>
    </section>
  );
}
