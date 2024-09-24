'use client';
import { useState } from 'react';
import { SelectModeButton } from '../../lobbies/SelectModeButton';

interface ModalWrapperProps {
  ModalComponent: React.ComponentType<{
    setInputsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
}

export function ModalWrapper({ ModalComponent }: ModalWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateGame = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <SelectModeButton mode="multiplayer" onClick={handleCreateGame} />
      {isModalOpen && <ModalComponent setInputsShowing={setIsModalOpen} />}
    </>
  );
}
