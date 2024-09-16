'use client';
import { useRouter } from 'next/navigation';
import { SelectModeButton } from '../src/components/shared/SelectModeButton';
import { useState } from 'react';
import { CreateGameModal } from '../src/components/lobbies/modals/CreateGameModal';

export default function Home() {
  const router = useRouter();
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);

  const navigateToPuzzle = () => {
    router.push('/puzzle/0');
  };

  return (
    <section className="flex flex-col">
      <h1 className="py-8 text-center text-4xl">Create Game</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <SelectModeButton onClick={navigateToPuzzle} mode="singleplayer" />
        <SelectModeButton
          onClick={() => setInputsShowing(true)}
          mode="multiplayer"
        />
        {inputsShowing ? (
          <CreateGameModal setInputsShowing={setInputsShowing} />
        ) : null}
      </div>
    </section>
  );
}
