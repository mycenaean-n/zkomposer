'use client';
import { useState } from 'react';
import { CreateGameModal } from './create-game-modal';
import { SelectModeButton } from './SelectModeButton';

export function CreateGame() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <SelectModeButton
        mode="multiplayer"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && <CreateGameModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
