'use client';
import { useState } from 'react';
import CreateGameModal from './modals/CreateGameModal';

export function CreateGame() {
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setInputsShowing(true);
        }}
        className="h-32 w-32 border border-black p-5 text-center"
      >
        Multiplayer
      </button>
      {inputsShowing && <CreateGameModal setInputsShowing={setInputsShowing} />}
    </div>
  );
}
