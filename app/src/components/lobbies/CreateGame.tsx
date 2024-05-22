'use client';
import { useState } from 'react';
import CreateGameModal from './CreateGameModal';

export function CreateGame() {
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setInputsShowing(true);
        }}
        className="p-5 border border-black w-32 h-32 text-center"
      >
        Multiplayer
      </button>
      {inputsShowing && <CreateGameModal setInputsShowing={setInputsShowing} />}
    </div>
  );
}
