'use client';
import SinglePlayer from '../src/components/lobbies/SinglePlayer';
import { CreateGame } from '../src/components/lobbies/CreateGame';

export default function Home() {
  return (
    <div>
      <div className="mt-8 flex justify-center">
        <h1 className="text-2xl">Create Game</h1>
      </div>
      <div id="games" className="mt-16 flex justify-center gap-10">
        <SinglePlayer />
        <CreateGame />
      </div>
    </div>
  );
}
