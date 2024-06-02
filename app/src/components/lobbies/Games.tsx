'use client';
import { CreateGame } from './CreateGame';
import SinglePlayer from './SinglePlayer';

export function Games() {
  return (
    <div>
      <>
        <div className="flex justify-center mt-8">
          <h1 className="text-2xl">Create Game</h1>
        </div>
        <div id="games" className="flex justify-center gap-10 mt-16">
          <SinglePlayer />
          <CreateGame />
        </div>
      </>
    </div>
  );
}
