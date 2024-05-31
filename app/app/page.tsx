'use client';
import SinglePlayer from '../src/components/lobbies/SinglePlayer';
import { CreateGame } from '../src/components/lobbies/CreateGame';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-8">
        <h1 className="text-2xl">Create Game</h1>
      </div>
      <div id="games" className="flex justify-center gap-10 mt-16">
        <SinglePlayer />
        <CreateGame />
      </div>
    </div>
  );
}
