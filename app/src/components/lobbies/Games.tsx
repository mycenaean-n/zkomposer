'use client';
import { CreateGame } from './CreateGame';
import SinglePlayer from './SinglePlayer';

export function Games() {
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
