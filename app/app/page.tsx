'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateGameModal } from '../src/components/lobbies/modals/CreateGameModal';
import { SelectModeButton } from '../src/components/lobbies/SelectModeButton';
import { LoadingState } from '../src/components/zk/LoadingState';

export default function Home() {
  const router = useRouter();
  const [inputsShowing, setInputsShowing] = useState<boolean>(false);
  const { ready } = usePrivy();

  const navigateToPuzzle = () => {
    router.push('/puzzle/0');
  };

  return (
    <section className="flex flex-col">
      <h1 className="py-8 text-center text-4xl">Create Game</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {ready ? (
          <>
            <SelectModeButton onClick={navigateToPuzzle} mode="singleplayer" />
            <SelectModeButton
              onClick={() => setInputsShowing(true)}
              mode="multiplayer"
            />
          </>
        ) : (
          <LoadingState textMain="Loading Privy" />
        )}
        {inputsShowing ? (
          <CreateGameModal setInputsShowing={setInputsShowing} />
        ) : null}
      </div>
    </section>
  );
}
